'use strict';

describe('myApp.view2 module', function() {

  beforeEach(module('myApp.view2'));

  describe('view2 cont', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var view2Ctrl = $controller('ViewCtrl');
      expect(view2Ctrl).toBeDefined();
    }));

  });
});