(function () {
  'use strict';

  angular
    .module('clientmanagements')
    .controller('ClientInventorymanagementsListController', ClientInventorymanagementsListController);

  angular
    .module('inventorymanagements')
    .controller('ClientInventorymanagementsListController', ClientInventorymanagementsListController)
    .filter("emptyifblank", function () {
      return function (object, query) {
        if (!query)
          return {};
        else
          return object;
      };
    });

  ClientInventorymanagementsListController.$inject = ['ClientmanagementsService', 'InventorymanagementsService', '$scope', '$state', 'Authentication'];

  function ClientInventorymanagementsListController(ClientmanagementsService, InventorymanagementsService, $scope, $state, Authentication)
  {
    //import Quagga from 'quagga'; // ES6 
    //var Quagga = require('quagga').default; // Com
     
    /**Quagga initialiser starts here*/
    
    /*var newscript = document.createElement('script');
    newscript.type = 'text/javascript';
    newscript.async = true;
    newscript.src = 'jquery-1.8.1-min.js';//'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
    (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
    */
    
    /*var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js";
    //"http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js";//"http://code.jquery.com/jquery-2.2.1.min.js";

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = handler;
    script.onload = handler;

    // Fire the loading
    head.appendChild(script);

    function handler(){
      console.log('jquery added :)');
    }
    */
    /*
    //$scope.Quagga = $(function Q() {
    (function($) {
      $(function() {  
        var Quagga = window.Quagga;
        var value;
        var App = {
            init : function() {
                Quagga.init(this.state, function(err) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    App.attachListeners();
                    Quagga.start();
                });
            },
            initCameraSelection: function(){
                var streamLabel = Quagga.CameraAccess.getActiveStreamLabel();

                return Quagga.CameraAccess.enumerateVideoDevices()
                .then(function(devices) {
                    function pruneText(text) {
                        return text.length > 30 ? text.substr(0, 30) : text;
                    }
                    var $deviceSelection = document.getElementById("deviceSelection");
                    while ($deviceSelection.firstChild) {
                        $deviceSelection.removeChild($deviceSelection.firstChild);
                    }
                    devices.forEach(function(device) {
                        var $option = document.createElement("option");
                        $option.value = device.deviceId || device.id;
                        $option.appendChild(document.createTextNode(pruneText(device.label || device.deviceId || device.id)));
                        $option.selected = streamLabel === device.label;
                        $deviceSelection.appendChild($option);
                    });
                });
            },
                querySelectedReaders: function() {
            return Array.prototype.slice.call(document.querySelectorAll('.readers input[type=checkbox]'))
                .filter(function(element) {
                    return !!element.checked;
                })
                .map(function(element) {
                    return element.getAttribute("name");
                });
        },
            attachListeners: function() {
                var self = this;

                self.initCameraSelection();
                $(".controls").on("click", "button.stop", function(e) {
                    e.preventDefault();
                    Quagga.stop();
                });

                $(".controls .reader-config-group").on("change", "input, select", function(e) {
                    e.preventDefault();
                    var $target = $(e.target);
                       // value = $target.attr("type") === "checkbox" ? $target.prop("checked") : $target.val(),
                       value =  $target.attr("type") === "checkbox" ? this.querySelectedReaders() : $target.val();
                      var  name = $target.attr("name"),
                        state = self._convertNameToState(name);

                    console.log("Value of "+ state + " changed to " + value);
                    self.setState(state, value);
                });
            },
            _accessByPath: function(obj, path, val) {
                var parts = path.split('.'),
                    depth = parts.length,
                    setter = (typeof val !== "undefined") ? true : false;

                return parts.reduce(function(o, key, i) {
                    if (setter && (i + 1) === depth) {
                        if (typeof o[key] === "object" && typeof val === "object") {
                            Object.assign(o[key], val);
                        } else {
                            o[key] = val;
                        }
                    }
                    return key in o ? o[key] : {};
                }, obj);
            },
            _convertNameToState: function(name) {
                return name.replace("_", ".").split("-").reduce(function(result, value) {
                    return result + value.charAt(0).toUpperCase() + value.substring(1);
                });
            },
            detachListeners: function() {
                $(".controls").off("click", "button.stop");
                $(".controls .reader-config-group").off("change", "input, select");
            },
            setState: function(path, value) {
                var self = this;

                if (typeof self._accessByPath(self.inputMapper, path) === "function") {
                    value = self._accessByPath(self.inputMapper, path)(value);
                }

                self._accessByPath(self.state, path, value);

                console.log(JSON.stringify(self.state));
                App.detachListeners();
                Quagga.stop();
                App.init();
            },
            inputMapper: {
                inputStream: {
                    constraints: function(value){
                        if (/^(\d+)x(\d+)$/.test(value)) {
                            var values = value.split('x');
                            return {
                                width: {min: parseInt(values[0])},
                                height: {min: parseInt(values[1])}
                            };
                        }
                        return {
                            deviceId: value
                        };
                    }
                },
                numOfWorkers: function(value) {
                    return parseInt(value);
                },
                decoder: {
                    readers: function(value) {
                        if (value === 'ean_extended') {
                            return [{
                                format: "ean_reader",
                                config: {
                                    supplements: [
                                        'ean_5_reader', 'ean_2_reader'
                                    ]
                                }
                            }];
                        }
                        console.log("value before format :"+value);
                        return [{
                            format: value + "_reader",
                            config: {}
                        }];
                    }
                }
            },
            state: {
                inputStream: {
                    type : "LiveStream",
                    constraints: {
                        width: {min: 640},
                        height: {min: 480},
                        aspectRatio: {min: 1, max: 100},
                        facingMode: "environment" // or user
                    }
                },
                locator: {
                    patchSize: "large",
                    halfSample: true
                },
                numOfWorkers: 4,
                decoder: {
                    readers : ["code_39_reader","code_128_reader"]
                },
                locate: true,
                multiple:true
            },
            lastResult : null
        };

                       //value =  App.querySelectedReaders() ;
        App.init();

        Quagga.onProcessed(function(result) {
            var drawingCtx = Quagga.canvas.ctx.overlay,
                drawingCanvas = Quagga.canvas.dom.overlay;

            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(drawingCanvas.getAttribute("height")));
                    result.boxes.filter(function (box) {
                        return box !== result.box;
                    }).forEach(function (box) {
                        Quagga.ImageDebug.drawPath(box, {x: 0, y: 1}, drawingCtx, {color: "green", lineWidth: 2});
                    });
                }

                if (result.box) {
                    Quagga.ImageDebug.drawPath(result.box, {x: 0, y: 1}, drawingCtx, {color: "#00F", lineWidth: 2});
                }

                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(result.line, {x: 'x', y: 'y'}, drawingCtx, {color: 'red', lineWidth: 3});
                }
            }
        });

        Quagga.onDetected(function(result) {
            var code = result.codeResult.code;

            if (App.lastResult !== code) {
                App.lastResult = code;
                var $node = null, canvas = Quagga.canvas.dom.image;

                $node = $('<li><div class="thumbnail"><div class="imgWrapper"><img /></div><div class="caption"><h4 class="code"></h4></div></div></li>');
                $node.find("img").attr("src", canvas.toDataURL());
                $node.find("h4.code").html(code);
                $("#result_strip ul.thumbnails").prepend($node);
            }
        });
  });
})(jQuery);
    */
            
    /*   
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#yourElement')    // Or '#yourElement' (optional)
      },
      decoder : {
        readers : ["code_128_reader"]
      }
    },
    function(err) {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
    });
      
    Quagga.decodeSingle({
      src: "image-abc-123.jpg",
      numOfWorkers: 0,  // Needs to be 0 when used within node
      inputStream: {
        size: 800  // restrict input-size to be 800px in width (long-side)
      },
      decoder: {
        readers: ["code_128_reader"] // List of active readers
      },
    },
    function(result) {
      if(result.codeResult) {
        console.log("result", result.codeResult.code);
      }
      else {
        console.log("not detected");
      }
    });
    */
      
      
      
    /*var Quagga = window.Quagga;
    var App = {
      _scanner: null,
      init: function() {
        this.attachListeners();
      },
      activateScanner: function() {
        var scanner = this.configureScanner('.overlay__content'),
          onDetected = function (result) {
            document.querySelector('input.isbn').value = result.codeResult.code;
            stop();
          }.bind(this),
          stop = function() {
            scanner.stop();  // should also clear all event-listeners?
            scanner.removeEventListener('detected', onDetected);
            this.hideOverlay();
            this.attachListeners();
          }.bind(this);
        this.showOverlay(stop);
        scanner.addEventListener('detected', onDetected).start();
      },
      attachListeners: function() {
        var self = this,
          button = document.querySelector('.input-field input + button.scan');
        button.addEventListener("click", function onClick(e) {
          e.preventDefault();
          button.removeEventListener("click", onClick);
          self.activateScanner();
        });
      },
      showOverlay: function(cancelCb) {
        var closeButton;
        if (!this._overlay) {
          var content = document.createElement('div');
          closeButton = document.createElement('div');
          closeButton.appendChild(document.createTextNode('X'));
          content.className = 'overlay__content';
          closeButton.className = 'overlay__close';
          this._overlay = document.createElement('div');
          this._overlay.className = 'overlay';
          this._overlay.appendChild(content);
          content.appendChild(closeButton);
          closeButton.addEventListener('click', function closeClick() {
            closeButton.removeEventListener('click', closeClick);
            cancelCb();
          });
          document.body.appendChild(this._overlay);
        }
        else {
          closeButton = document.querySelector('.overlay__close');
          closeButton.addEventListener('click', function closeClick() {
            closeButton.removeEventListener('click', closeClick);
            cancelCb();
          });
        }
        this._overlay.style.display = "block";
      },
      hideOverlay: function() {
        if (this._overlay) {
          this._overlay.style.display = "none";
        }
      },
      configureScanner: function(selector) {
        if (!this._scanner) {
          this._scanner = Quagga
          .decoder({ readers: ['ean_reader'] })
          .locator({ patchSize: 'medium' })
          .fromVideo({
            target: selector,
            constraints: {
              width: 800,
              height: 600,
              facingMode: "environment"
            }
          });
        }
        return this._scanner;
      }
    };
    App.init();  
    */    
      
    var vm = this;
      
    vm.clientmanagements = ClientmanagementsService.query();
    vm.inventorymanagements = InventorymanagementsService.query();
    $scope.$state = $state;
    $scope.authentication = Authentication;

    function toasty() {
      var x = document.getElementById("snackbar");
      x.className = "show";
      setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    $scope.cancelButton = function () {
      if ("admin" === Authentication.user.roles[0]) {
        $state.go('mainmenuadmin');
      } else {
        $state.go('mainmenu');
      }
    };

    $scope.moveToClient = function () {
      if (!$scope.serial && !$scope.nameAndEmail) {
        alert("You must fill in a Client and UPC first");
      } else if (!$scope.serial) {
        alert("You must fill in a UPC first");
      } else if (!$scope.nameAndEmail) {
        alert("You must fill in a Client first");
      } else {
        var invResult = -1;
        for (var i = 0; i < vm.inventorymanagements.length; i++) {
          if (vm.inventorymanagements[i].upc === $scope.serial.upc) {
            invResult = i;
            break;
          }
        }
        if (vm.inventorymanagements[invResult].qty === 0) {
          // out of stock
          alert("This item is out of stock");
          return;
        }
        var clientInfo = $scope.nameAndEmail.split(" --- ");
        var clientResult = -1;
        for (i = 0; i < vm.clientmanagements.length; i++) {
          if (vm.clientmanagements[i].name === clientInfo[0] && vm.clientmanagements[i].email === clientInfo[1]) {
            clientResult = i;
            break;
          }
        }
        if (invResult === -1 && clientResult === -1) {
          alert("That Client and UPC don't exist");
        } else if (invResult === -1) {
          alert("That UPC doesn't exist");
        } else if (clientResult === -1) {
          alert("That Client doesn't exist");
        } else {
          // found an item with this upc and a client with the right name and email combo
          var alreadyHas = false;
          for (i = 0; i < vm.clientmanagements[clientResult].inventory.length; i++) {
            if (vm.clientmanagements[clientResult].inventory[i].upc === vm.inventorymanagements[invResult].upc) {
              // client already has this, increase by one
              vm.clientmanagements[clientResult].inventory[i].qty += 1;
              alreadyHas = true;
              break;
            }
          }
          if (!alreadyHas) {
            vm.clientmanagements[clientResult].inventory.push({
              tags: vm.inventorymanagements[invResult].tags,
              upc: vm.inventorymanagements[invResult].upc,
              qty: 1
            });
          }
          vm.inventorymanagements[invResult].qty -= 1;
          vm.clientmanagements[clientResult].$update(successCallback, errorCallback);
          vm.inventorymanagements[invResult].$update(successCallback, errorCallback);
          // gimme that toast
          toasty();
          // clear upc field
          $scope.serial = null;
        }
      }
      function successCallback(res) {
        // toasty
        // console.log("success");
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    };

    $scope.moveToInventory = function () {
      if (!$scope.serial && !$scope.nameAndEmail) {
        alert("You must fill in a Client and UPC first");
      } else if (!$scope.serial) {
        alert("You must fill in a UPC first");
      } else if (!$scope.nameAndEmail) {
        alert("You must fill in a Client first");
      } else {
        var clientInfo = $scope.nameAndEmail.split(" --- ");
        var clientResult = -1;
        for (var i = 0; i < vm.clientmanagements.length; i++) {
          if (vm.clientmanagements[i].name === clientInfo[0] && vm.clientmanagements[i].email === clientInfo[1]) {
            clientResult = i;
            break;
          }
        }
        var invResult = -1;
        for (i = 0; i < vm.inventorymanagements.length; i++) {
          if (vm.inventorymanagements[i].upc === $scope.serial.upc) {
            invResult = i;
            break;
          }
        }
        if (invResult === -1 && clientResult === -1) {
          alert("That Client and UPC don't exist");
        } else if (invResult === -1) {
          alert("That UPC doesn't exist");
        } else if (clientResult === -1) {
          alert("That Client doesn't exist");
        } else {
          // client and item exist, now check if client has that item
          var alreadyHas = false;
          for (i = 0; i < vm.clientmanagements[clientResult].inventory.length; i++) {
            if (vm.clientmanagements[clientResult].inventory[i].upc === vm.inventorymanagements[invResult].upc) {
              // client already has this, now decrement by 1 and check if item should be removed
              vm.clientmanagements[clientResult].inventory[i].qty -= 1;
              if (vm.clientmanagements[clientResult].inventory[i].qty === 0) {
                // remove this item from their inventory
                vm.clientmanagements[clientResult].inventory.splice(i, 1);
              }
              alreadyHas = true;
              break;
            }
          }
          if (!alreadyHas) {
            // client doesn't have this item, nothing to transfer
            alert("Client doesn't have this item");
            return;
          }
          vm.inventorymanagements[invResult].qty += 1;
          vm.clientmanagements[clientResult].$update(successCallback, errorCallback);
          vm.inventorymanagements[invResult].$update(successCallback, errorCallback);
          // get toasty
          toasty();
          // clear upc field
          $scope.serial = null;
        }
      }
      function successCallback(res) {
        // more toast
        // console.log("success");
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    };
  }
}());
