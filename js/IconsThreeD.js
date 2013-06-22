/*
    *  Title:         IconsThreeD
    *  Description:   Display Icons as boxes using THREE.js
    *                 (Meant for Udacity's CS291 competiton, part 2.)
    *  Author:        Oliver Schafeld, @nexxos_de
    *  Date:          2013-06-22 (three.js v56)
    *  Version:       0.002
    *
    *  It ain't the greatest software on earth 
    *  but it'll boost your site's nyan factor by a factor of 10.
    *  Once it's finished. Big cat promise, paws crossed.
    *
    *
    *  The MIT License (MIT)
    *  
    *  Copyright (c) 2013 Oliver Schafeld
    *  
    *  Permission is hereby granted, free of charge, to any person obtaining a copy
    *  of this software and associated documentation files (the "Software"), to deal
    *  in the Software without restriction, including without limitation the rights
    *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    *  copies of the Software, and to permit persons to whom the Software is
    *  furnished to do so, subject to the following conditions:
    *  
    *  The above copyright notice and this permission notice shall be included in
    *  all copies or substantial portions of the Software.
    *  
    *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    *  THE SOFTWARE.
    */

      var DEBUG = false;

      // find window height for fullscreen display
      var body = document.body;
      var html = document.documentElement;
      var windowHeight = Math.max( body.scrollHeight, body.offsetHeight, 
                             html.clientHeight, html.scrollHeight, html.offsetHeight );
      var windowWidth  = document.body.clientWidth; 

      // define canvas/viewport size
      // subtract 2 * margin + 2 * border (if margin is defined in css for canvas)
      canvasHeight = windowHeight - 22;
      canvasWidth  = windowWidth  - 22;
      // can be arbitrary size e.g. to fit into a website layout
      // canvasHeight = 200;
      // canvasWidth  = 600;


      // size of boxes
      var cubeSizeX = cubeSizeY = cubeSizeZ = 30;

      // equal camera distance along all axes makes for 45deg view angle
      var camDistX = 300; // X !== Y makes camera 'wobble'
      var camDistY = 150; // make angle steeper/shallower
      var camDistZ = 300;

      var renderer = new THREE.WebGLRenderer({antialias:true});
      // renderer.setSize(document.body.clientWidth, document.body.clientHeight);
      renderer.setSize(canvasWidth, canvasHeight );

      document.body.appendChild(renderer.domElement);
      renderer.setClearColorHex(0xEEEEEE, 1.0);
      renderer.clear();

      var fov = 45; // camera field-of-view in degrees
      var width = renderer.domElement.width;
      var height = renderer.domElement.height;
      var aspect = width / height; // view aspect ratio
      var near = 1; // near clip plane
      var far = 10000; // far clip plane
      var camera = new THREE.PerspectiveCamera( fov, aspect, near, far );
      camera.position.z = 300;

      var scene = new THREE.Scene();

      // Object cube1
      var cube1 = new THREE.Mesh(
        new THREE.CubeGeometry(cubeSizeX, cubeSizeY, cubeSizeZ),
        // dull, unlit cube
        // new THREE.MeshBasicMaterial({color: 0xff0000, opacity: 1})
        // cube material receives lighting
        new THREE.MeshLambertMaterial({color: 0xFFAAAA})
      );

      scene.add(cube1);

    // Object cube2
      var cube2 = new THREE.Mesh(
        new THREE.CubeGeometry(cubeSizeX, cubeSizeY, cubeSizeZ),
        new THREE.MeshLambertMaterial({color: 0xAAFFAA})
      );
      cube2.position.x = cubeSizeX/2 + 30;
      scene.add(cube2);

    // Object cube3
      var cube3 = new THREE.Mesh(
        new THREE.CubeGeometry(cubeSizeX, cubeSizeY, cubeSizeZ),
        new THREE.MeshLambertMaterial({color: 0xAAAAFF})
      );
      cube3.position.x = cubeSizeX/2 + 75;
      scene.add(cube3);

      // Add lighting
      var light = new THREE.SpotLight();
      light.position.set( 170, 330, -160 );
      scene.add(light);

      function animate(t) {
        // spin the camera in a circle around y axis
        camera.position.x = Math.sin(t/1000)* camDistX;
        camera.position.y = camDistY;
        camera.position.z = Math.cos(t/1000)* camDistZ;
        // need to update lookAt every frame
        camera.lookAt(scene.position);
        // renderer automatically clears unless autoClear = false
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate, renderer.domElement);
      };

      // call animation and render
      animate(new Date().getTime());
