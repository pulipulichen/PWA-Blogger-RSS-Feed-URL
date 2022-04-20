/* global ClipboardUtils */

let appMain = {
  data () {
    
    return {
      cacheKey: 'Blogger-Feed',
      cacheAttrs: ['bloggerURL'],
      init: false,
      
      bloggerURL: 'https://blog.pulipuli.info'
    }
  },
  mounted () {
    this.dataLoad()
    
    this.inited = true
  },
  components: {
    'url-field': httpVueLoader('./url-field/url-field.vue'),
  },
  // watch: {
  // },
  computed: {
    computedBaseURL () {
      let url = this.bloggerURL
      try {
        new URL(url)
      }
      catch (e) {
        return false
      }

      if (url.endsWith('/')) {
        url = url.slice(0, -1)
      }
      return url
    },
    computedPostsATOM () {
      return {
        label: 'Posts ATOM',
        url: this.computedBaseURL + '/feeds/posts/default'
      }
    },
    computedPostsRSS () {
      return {
        label: 'Posts RSS',
        url: this.computedBaseURL + '/feeds/posts/default?alt=rss'
      }
    },
    computedCommentsATOM () {
      return {
        label: 'Comments ATOM',
        url: this.computedBaseURL + '/feeds/comments/default'
      }
    },
    computedCommentsRSS () {
      return {
        label: 'Comments RSS',
        url: this.computedBaseURL + '/feeds/comments/default?alt=rss'
      }
    },
    computedLinks () {
      return [
        this.computedPostsATOM,
        this.computedPostsRSS,
        this.computedCommentsATOM,
        this.computedCommentsRSS,
      ]
    },
  },
  methods: {
    dataLoad () {
      let projectFileListData = localStorage.getItem(this.cacheKey)
      if (!projectFileListData) {
        return false
      }
      
      projectFileListData = JSON.parse(projectFileListData)
      for (let key in projectFileListData) {
        this[key] = projectFileListData[key]
      }
    },
    dataSave () {
      if (this.inited === false) {
        return false
      }
      
      let keys = this.cacheAttrs
      
      let data = {}
      keys.forEach(key => {
        data[key] = this[key]
      })
      
      data = JSON.stringify(data)
      localStorage.setItem(this.cacheKey, data)
    },
    openURL (url) {
      window.open(url, url, 'height=500,width=500,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes')
    },
    copyURL (text) {
      navigator.clipboard.writeText(text).then(function() {
        console.log('Async: Copying to clipboard was successful!', text);
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    }
  }
}

module.exports = appMain