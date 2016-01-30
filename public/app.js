(function(){

  angular.module('beatsByKev', [])

  .controller('LinesController', ['$interval', '$http',
      function($interval, $http){

    this.lines = [];
    this.word = null;

    var interval = null;
    var loading = false;

    var that = this;

    function load(word, callback){
      loading = true;
      $http.get('song/' + word)
      .success(function(data, status, headers, config){
        loading = false;
        callback(data);
      });
    }

    this.change = function(){

      if(that.word === '' || that.word === null){
        return;
      }

      if(interval){
        $interval.cancel(interval);
        interval = null;
      }

      that.lines = [];

      load(that.word, function(data){

        var index = 0;

        interval = $interval(function(){
          that.lines.push(data[index++]);
          if(index === data.length){
            $interval.cancel(interval);
          }
        }, 1000);
      });
    }

    this.showLoading = function(){
      return loading === true;
    }



    // var srclines = [
    //   "I've been through the desert on a horse with no name.",
    //   'It felt good to be out of the rain.',
    //   'In the desert, you can remember your name,',
    //   "for there ain't no one for to give you no pain"
    // ];


  }]);

})();
