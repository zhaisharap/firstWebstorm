<template>
  <a-card bordered>
    <div>
      <a-tabs defaultActiveKey="1" :tabPosition="mode" @prevClick="callback" @nextClick="callback" class="g3-markdown">
        <a-tab-pane tab="Html" key="1">
          <Html></Html>
        </a-tab-pane>
        <a-tab-pane tab="JavaScript" key="2">
          <JavaScript></JavaScript>
        </a-tab-pane>
        <a-tab-pane tab="Es6" key="3">
          <ES6></ES6>
        </a-tab-pane>
        <a-tab-pane tab="Css" key="4">
          <CSS></CSS>
        </a-tab-pane>
        <a-tab-pane tab="Less" key="5">
          <LESS></LESS>
        </a-tab-pane>
        <a-tab-pane tab="Vue" key="6">
          <Vue></Vue>
        </a-tab-pane>
      </a-tabs>
    </div>

  </a-card>
</template>

<script>

import Html from '@docs/html.md'
import JavaScript from '@docs/javascript.md'
import ES6 from '@docs/es6.md'
import CSS from '@docs/css.md'
import LESS from '@docs/less.md'
import Vue from '@docs/vue.md'
export default {
  name: 'Index',
  components: { Html, Vue, JavaScript, ES6, CSS, LESS },
  data () {
    return {
      mode: 'left'
    }
  },
  methods: {
    callback (val) {
      console.log(val)
    }
  }
}
</script>

<style>

  .g3-markdown pre code {
    background: #f5f5f5;
    display: block;
    padding: 10px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }

  .g3-markdown blockquote {
    margin: 0 0 24px;
    padding: 0 15px;
    color: #777;
    border-left: 4px solid #ddd;
  }

  .g3-markdown h1, .g3-markdown h2, .g3-markdown h3, .g3-markdown h4, .g3-markdown h5, .g3-markdown h6 {
    margin-top: 17px;
    margin-bottom: 8px;
    font-weight: bold;
    line-height: 1.5;
    min-height: 1.5em;
    color: #000;
  }
  .g3-markdown h3 {
    font-size: 16px;
  }
</style>
