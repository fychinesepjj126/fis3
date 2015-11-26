//    require.resourceMap(__RESOURCE_MAP__);
fis.hook('commonjs', {
  paths: {
    'backbone': 'static/js/lib/backbone.js'
  },
  packages: [
    {
        name: '_backbone',
        location: 'static/js/package/backbone',
        main: 'backbone.js'
    },
    {
        name: 'underscore',
        location: 'static/js/package/underscore',
        main: 'underscore.js'
    },
    {
        name: 'zepto',
        location: 'static/js/package/zepto',
        main: 'zepto.min.js'
    },
    {
      name: 'jquery',
      location: 'static/js/package/jquery', 
      main: 'jquery.min.js'
    }
  ]   //load plugin use require('jquery/lazyload'), default load require('jquery') is only jquery.
});

/*fis.hook('module', {
    mode: 'mod'
});*/


fis.match('static/js/**.js', {
    isMod: true
}).match('static/js/common/*.js', {
    isMod: false
}).match('modules/**',{
    isMod: true,
    useSameNameRequire: true,
    release: 'static/$0'
}).match(/^\/modules\/([^\/]+)\/\1\.(js)$/i, {
    id: 'modules/$1'
}).match('widgets/**', {
    isMod: true,
    useSameNameRequire: true,
    release: 'static/$0'
}).match(/^\/widgets\/([^\/]+)\/\1\.(js)$/i, {
    id: 'widgets/$1'
});


fis.match('static/tpl/(**).jade', {
    isJsLike: true,
    parser: fis.plugin('jade-runtime'),
    rExt: '.js',
    isMod: true,
    wrap: false,
    id: '$1',
    postprocessor: fis.plugin('jswrapper', {
        wrap: '',
        template : "define('${id}', function(require, exports, module) {module.exports=${content};})"
    })
})


//page里的页面发布到根目录
fis.match("page/(*.html)",{
    release: '/$1',
    useCache : false
});

/*
require.async([variableName]) 
async加载的是动态变量时，
由于fis无法分析代码生成动态生成resourceMap因此需要手动include目录
*/
fis.match('::packager', {
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: false,
        resoucemap: 'static/pkg/${filepath}_map.js',
/*        include: [
          'modules/**.js',
          'widgets/**.js'
        ]*/
    }),
    packager: fis.plugin('map')
})