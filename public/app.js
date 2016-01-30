(function(){

  angular.module('beatsByKev', [])

  .controller('LinesController', function($interval){

    this.lines = [];

    this.getLines = function(){

    }

    this.showLoading = function(){
      return that.lines.length === 0;
    }

    var that = this;

    var interval = $interval(function(){
      that.lines.push(srclines[index] + ctr++);
      index = (index + 1) % srclines.length ;
      if(ctr === 10){
        $interval.cancel(interval);
      }
    }, 1000);

    var index = 0;
    var ctr = 0;
    var srclines = [
      "I've been through the desert on a horse with no name.",
      'It felt good to be out of the rain.',
      'In the desert, you can remember your name,',
      "for there ain't no one for to give you no pain"
    ];


  });

})();
