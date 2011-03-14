/*
 * JSARToolkit-Wrapper
 * A simple way to add augmented reality content to your web page.
 *
 * Version  : NA
 * Author   : F1LT3R
 * License  : GPL3
 * Github   : http://github.com/F1LT3R/JSARToolkit-Wrapper
 * Info     : http://weblog.bocoup.com/name-of-post

 */
 
(function( global, doc ){

  // DEFAULTS //////////////////////////////////////////////////////////////////

  // Tracker Defaults
  var Tracker_defs = {
    src       : null,
    volume    : 0,
    autoplay  : true,
    repeat    : true,
    target    : null,
    ratio     : 0.5,
    threshold : 80,
    width     : 720,
    height    : 480,
    debug     : false
  };



 // GLOBAL VARS ////////////////////////////////////////////////////////////////

  var imageBank             = [],

      // DataURI Placeholder for Missing Content
      imageURI_placeholder  = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxNzY1Nzk3NjM4NEJFMDExQTZENkFGREM3OUJFQ0RBQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFNTVBQUIwOTRCNTYxMUUwOUJCMEZGQjIzQ0NCRjM3QyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFNTVBQUIwODRCNTYxMUUwOUJCMEZGQjIzQ0NCRjM3QyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoxNzY1Nzk3NjM4NEJFMDExQTZENkFGREM3OUJFQ0RBQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxNzY1Nzk3NjM4NEJFMDExQTZENkFGREM3OUJFQ0RBQyIvPiA8L3JkZjpEZXNjcmlwdGlv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'
  ;



  // HELPERS ///////////////////////////////////////////////////////////////////

  // Get a DOM Element by it's ID
  function byId( id ){ return document.getElementById( id ); };

  // Get a DOM Element by it's ID
  function byClass( className ){ return document.getElementsByClassName( className ); };

  // Console Log Handler
  if( !window.console ){ global.console = { log : function(){} }; }

  // Error handling
  function error( msg ){ console.log( msg ); };
  
  // Object Merging
  function merge( a ){
    for(var i in a){
      this[i] = a[i];
    }
    return this;
  };

  function radians( angle ){
    return (angle / 180) * Math.PI;
  };



  // MARKER CLASS //////////////////////////////////////////////////////////////

  var Marker_defs = {
    _src       : imageURI_placeholder,
    _model     : null,
    _scale     : 1,
    _position  : [ 0, 0, 0.5 ],
    _axis      : [ 0, 0, 0 ],
    _angle     : 0
  };

  // Marker Ctor
  function Marker( opts ){
    merge.call( this, Marker_defs );
    merge.call( this, opts );
    return this;
  };
  
  var Marker_proto = Marker.prototype;


  // Load/replace Marker image
  Marker_proto.image = function Marker_image( url, callback ){
    this.img = new Image();
    
    // Image load callback
    this.img.addEventListener('load', function( e ){
      if( callback ){ callback( e ); }
    }, false);

    if( this.imageMagiNode ){
      this.imageMagiNode.setImage( this.img );
    }

    // Initiate loading of image
    this.img.src = url;

    return this;
  };


  // Load/replace Marker's 3D model
  Marker_proto.model = function Marker_model( modelName ){
    this._model = modelName;
    return this;
  };


  // Scale Marker's Magi-node
  Marker_proto.scale = function Marker_scale( scale ){
    this._scale = scale;
    if( this.imageMagiNode ){
      this.imageMagiNode.setSize(2.5 * scale);
    }
    return this;
  };


  // Position Marker's Magi-node
  Marker_proto.position = function Marker_position( x, y, z ){
    this._position = [ x, y, z + 0.5 ];
    if( this.imageMagiNode ){
      this.imageMagiNode.setPosition( x, y, z + 0.5 );
    }
    return this;
  };

  // Axis Marker's Magi-node
  Marker_proto.axis = function Marker_axis( x, y, z ){
    this._axis = [ x, y, z + 1 ];
    if( this.imageMagiNode ){
      this.imageMagiNode.setAxis( x, y, z + 1 );
    }
    return this;
  };
  
  // Angle Marker's Magi-node
  Marker_proto.angle = function Marker_angle( angle ){
    if( this.imageMagiNode ){
      this.imageMagiNode.setAngle( (-Math.PI/2) + angle );
    }
    this._angle = angle;
    return this;
  };


  // Allow traversing up from Marker
  Marker_proto.parent = function Marker_parent(){  
    return this.parent;
  };



  // TRACKER CLASS //////////////////////////////////////////////////////////////

  // Tracker Ctor
  function Tracker( opts ){
   
    // Merge with defaults and overwrite defs with any options pass as args
    merge.call( this, Tracker_defs );
    merge.call( this, opts );

    // Create public DOM objects for video and debug content
    this.video = document.createElement( 'VIDEO' ); 
    this.debugCanvas = doc.createElement( 'CANVAS' );

    // Create private vars for visibility in deeper-scope listener events
    var video       = this.video,
        debugCanvas = this.debugCanvas
        markers     = this.markers = {}
    ;

    this.video.addEventListener('error', function( e ){
       error( 'Unkown error: possible incorrect Video source.', e );
    }, false);

    // Fix the dimensions of the video element to the values passed as options
    video.width  = opts.width;
    video.height = opts.height;

    // Start the video automatically?
    if( opts.autoplay ){
      video.setAttribute( 'autoplay', true );
    }

    // Set the volume of the video clip
    video.volume = opts.volume;

    // Load the video
    video.src = opts.src;
    
    // Create the debug/tracker-processing? canvas    
    this.debugCanvas.width      = parseInt( opts.ratio * video.width );
    this.debugCanvas.height     = parseInt( opts.ratio * video.height );
    this.debugCanvas.className  = 'JSARToolkit_debugCanvas';

    // Append the debug canvas to the DOM target if 
    if( opts.debug ){
      if(!opts.target.appendChild( this.debugCanvas )){
        error( 'Could not append Debug Canvas to DOM Target.' );
      }
    }
    
    // Set up the JSARToolkit
    var raster          = new NyARRgbRaster_Canvas2D( this.debugCanvas ),
        param           = new FLARParam( parseInt( opts.ratio * video.width ), parseInt( opts.ratio * video.height )),
        resultMat       = new NyARTransMatResult(),
        detector        = new FLARMultiIdMarkerDetector( param, 80 ),
        ctx             = this.debugCanvas.getContext( '2d' ),
        outputCanvas    = E.canvas( video.width, video.height ),
        display2        = new Magi.Scene( outputCanvas )
    ;

    // Append the outputCanvas to the DOM
    if(!opts.target.appendChild( outputCanvas )){
      error( 'Could not append Video Element to DOM Target.' );
    }

    // Output seems less shakey when set to true --F1LT3R
    detector.setContinueMode( true );

    param.copyCameraMatrix( display2.camera.perspectiveMatrix, 100, 10000 );
    display2.camera.useProjectionMatrix = true;
    display2.drawOnlyWhenChanged = false;
    display2.camera.perspectiveMatrix[13] -= 1.5;
    display2.camera.perspectiveMatrix[5] *= (this.video.height / this.video.height );
    
    var fbo = new Magi.FBO( display2.gl, this.video.width*2, this.video.height*2, true );
    fbo.use();
    var img = new Magi.FilterQuad();
    img.material.textures.Texture0 = fbo.texture;
    img.material.floats.offsetY = 1.0 - ( this.video.height / this.video.height );
    display2.scene.appendChild( img );

    var videoCanvas = E.canvas( this.video.width, this.video.height );
    
    display = new Magi.Scene( fbo );
    display.drawOnlyWhenChanged = true;
    param.copyCameraMatrix( display.camera.perspectiveMatrix, 100, 10000 );
    display.camera.useProjectionMatrix = true;

    var videoTex = new Magi.FlipFilterQuad();
   
    videoTex.material.textures.Texture0 = new Magi.Texture();
    videoTex.material.textures.Texture0.image = videoCanvas;  
    videoTex.material.textures.Texture0.generateMipmaps = false;
    display.scene.appendChild( videoTex );

    display2.scene.addFrameListener(function( t, dt ){
      display.draw( t, dt );
    });

    material = Magi.DefaultMaterial.get();
    material.floats.MaterialAmbient   = vec4.create([1,1,1,0.0]);
    material.floats.MaterialDiffuse   = vec4.create([0.9,0.9,0.9,1.0]);
    material.floats.MaterialSpecular  = vec4.create([0.8,0.8,0.8,1.0]);
    material.floats.LightDiffuse      = vec4.create([0.5,0.45,0.4,1.0]);
    material.floats.LightSpecular     = vec4.create([0.5,0.45,0.4,1.0]);
    material.floats.LightPos          = vec4.create([-2400, 1200, 1200, 1.0]);
    material.floats.LightAmbient      = vec4.create([0.4, 0.34, 0.3, 1]);
    material.floats.Shininess         = 16;

    var times       = [],
        pastResults = {},
        cubes       = {},
        cubesLength = 0
    ;

    window.updateImage = function() {
      display.changed = display2.changed = true;
    }

    // VIDEO TEX FRAME LISTENER ////////////////////////////////////////////////
    videoTex.addFrameListener(function(){
    
      if( video.ended && opts.repeat ){ video.play(); }
      if (video.paused){ return; }
      if (window.paused){ return; }
      if (video.currentTime == video.duration && opts.repeat ){ video.currentTime = 0; }
      if (video.currentTime == video.lastTime && opts.repeat ){ return; }
      video.lastTime = video.currentTime;

      video.lastTime = video.currentTime;

      var t     = new Date(),
          dt    = t.getTime(),
          i     = 0,
          idx   = 0   
      ;

      videoCanvas.getContext( '2d' )
        .drawImage( video, 0, 0, videoCanvas.width, videoCanvas.height )
      ;
      
      // Notify canvases have been updated
      videoTex.material.textures.Texture0.changed = true;
      //TODO: add if statement back in
      //if( opts.debug ){
        debugCanvas.changed = true;
      //}
      display2.changed = display.changed = true;

      ctx.drawImage( videoCanvas, 0, 0, parseInt( opts.ratio * video.width ), parseInt( opts.ratio * video.height ) );
      var detected  = detector.detectMarkerLite( raster, opts.threshold );

      // Loop through QRs ?
      for( idx = 0; idx < detected; idx++ ){
        var id = detector.getIdMarkerData( idx ),
            currId
        ;
                 
        if( id.packetLength > 4 ){
          currId = -1;
        }else{
          currId = 0;
          for( i = 0; i < id.packetLength; i++ ){
            currId = (currId <<  8) | id.getPacketData( i );
          }
        }
        
        if( !pastResults[currId] ){
          pastResults[currId] = {};
        }
        
        detector.getTransformMatrix( idx, resultMat );
        
        pastResults[currId].age = 0;
        pastResults[currId].id = currId;
        pastResults[currId].transform = Object.asCopy( resultMat );
      }

      
      // Step through marker detection results array...
      for( i in pastResults ){
       
        if( !cubes[i] ){

          cubesLength ++;

          var overlay = markers[i];

          if( !!overlay ){

            var pivot = new Magi.Node(),

                hole  = new Magi.Node(),

                image = overlay.imageMagiNode = new Magi.Image( overlay.img )
                
                          .setSize( overlay._scale * 2.5 )
                                           
                          .setPosition(
                            overlay._position[0],
                            overlay._position[1],
                            overlay._position[2]
                          )

                          .setAxis(
                              overlay._axis[0],
                              overlay._axis[1],
                              overlay._axis[2] + 1
                          )
                          
                          .setAngle( (-Math.PI/2) + overlay._angle )
            ;

            (function( i ){
              image.setImage = function( elem ){
                if( elem.tagName == 'VIDEO' ){ elem.play(); }
                Magi.Image.setImage.call( this, overlay.img );
                this.texture.generateMipmaps = false;
              };
            })( i );

            pivot.image = image;
            image.addFrameListener(function(d,dt) {
              this.position[2] += (0.005-this.position[2])*0.5;
            });
     
            image.alignedNode.transparent = false;
            image.cullFace = 'BACK';
            image.material = material;
            hole.appendChild( image );

            pivot2 = new Magi.Node();
            pivot2.transform = mat4.identity();
            pivot2.setScale( 32 );
            pivot.pivot = pivot2;
            pivot.appendChild( pivot2 );
            pivot2.appendChild( hole );
            display.scene.appendChild( pivot );

            if( overlay._model ){
              var currentModel  = BlenderExport[ overlay._model ],
                  model         = importBlenderModel( currentModel )
              ;
              pivot.blenderModel = model;
              model.curMod = currentModel;
              model.transform = mat4.identity();
              model.setScale( 32 );
            }

          }

          //pivot.flip = cubesLength % 2 == 0;

          // Add model to view
          if( overlay && overlay._model ){           
            pivot.appendChild( model );
            
            pivot.addFrameListener( function( t, dt ){
              if( this.blenderModel.curMod != currentModel ){
                var model = importBlenderModel( currentModel );
                model.curMod = currentModel;
                model.transform = mat4.identity();
                model.setScale( 32 );
                this.removeChild( this.blenderModel );
                this.blenderModel = model;
                this.appendChild( model );
              }
            });
          }
          
          cubes[i] = pivot;
        }
         
        var mat = pastResults[i].transform;
        var cm = cubes[i].pivot.transform;
        cm[0] = mat.m00;
        cm[1] = -mat.m10;
        cm[2] = mat.m20;
        cm[3] = 0;
        cm[4] = mat.m01;
        cm[5] = -mat.m11;
        cm[6] = mat.m21;
        cm[7] = 0;
        cm[8] = -mat.m02;
        cm[9] = mat.m12;
        cm[10] = -mat.m22;
        cm[11] = 0;
        cm[12] = mat.m03;
        cm[13] = -mat.m13;
        cm[14] = mat.m23;
        cm[15] = 1;

        if( cubes[i].blenderModel && cubes[i].blenderModel.keepMoving ){
          mat4.set(cm, cubes[i].blenderModel.transform);
        }

      } // end of cubes[i] iteration
      
    });

    return this;
  };

  var Tracker_proto = Tracker.prototype;

  // Marker Interface
  Tracker_proto.marker = function Tracker_marker( id ){
    return ( this.markers[id] || (this.markers[id] = new Marker({ id: id, parent: this })) );
  };
   
  
  // JSARTOOLKIT-WRAPPER SUPER CLASS ///////////////////////////////////////////
 
  // JSARToolkit Lib Ctor
  function JSARToolkit(){
    this.trackers = [];
    return this;
  };
  var JSARToolkit_proto = JSARToolkit.prototype;

  
  // Tracking Initializer
  JSARToolkit_proto.tracker = function ARTracker_track( opts ){
    return this.trackers[this.trackers.length] = new Tracker( opts );
  };

  // Lib Instantiation
  global.jsartoolkit = new JSARToolkit();

})( window, document );
