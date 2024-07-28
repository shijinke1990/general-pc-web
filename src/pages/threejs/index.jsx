import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function ThreeJS() {
  const mountRef = useRef(null);

  useEffect(() => {
    // 创建场景
    const scene = new THREE.Scene();

    // 创建相机
    const camera = new THREE.PerspectiveCamera(5.75, window.innerWidth / window.innerHeight, 50, 1000);
    camera.position.x = -61.6;
    camera.position.y = -8;
    camera.position.z = 149;

    // 创建渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true; // 启用阴影映射
    renderer.setClearColor(0xffffff);

    // 添加轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);

    // 添加环境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    //添加点光源
    const pointLight = new THREE.DirectionalLight(0xffffff, 2);
    pointLight.position.set(12, 8, 30);
    pointLight.castShadow = true; // 启用阴影
    scene.add(pointLight);

    // 只在组件挂载时执行一次
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();

    // 定义顶点
    const vertices = new Float32Array([
      0, 0, 0, 0, 0, 1.25, 0, 11.7, 1.25, 0, 11.7, 0,

      0, 0, 1.25, 14.5, 0, 1.25, 14.5, 11.7, 1.25, 0, 11.7, 1.25,

      14.5, 0, 1.25, 14.5, 0, 0, 14.5, 11.7, 0, 14.5, 11.7, 1.25,

      14.5, 0, 0, 14.25, 0, 0, 14.25, 11.7, 0, 14.5, 11.7, 0,

      0.25, 0, 0, 0, 0, 0, 0, 11.7, 0, 0.25, 11.7, 0,

      0, 11.7, 1.25, 14.5, 11.7, 1.25, 14.5, 11.7, 0, 0, 11.7, 0,

      0, 0, 0, 14.5, 0, 0, 14.5, 0, 1.25, 0, 0, 1.25,

      14.5, 0, 0, 0, 0, 0, 0, 0.25, 0, 14.5, 0.25, 0,

      14.5, 11.45, 0, 0, 11.45, 0, 0, 11.7, 0, 14.5, 11.7, 0,
    ]);

    // 定义索引
    const indices = new Uint16Array([
      0, 1, 2, 0, 2, 3, 4, 5, 6, 4, 6, 7, 8, 9, 10, 8, 10, 11, 12, 13, 14, 12, 14, 15, 16, 17, 18, 16, 18, 19, 20, 21,
      22, 20, 22, 23, 24, 25, 26, 24, 26, 27, 28, 29, 30, 28, 30, 31, 32, 33, 34, 32, 34, 35,
    ]);

    // 定义 UV 坐标
    const uvs = new Float32Array([
      0.25 / 17,
      1.5 / 14.2,
      1.5 / 17,
      1.5 / 14.2,
      1.5 / 17,
      12.7 / 14.2,
      0.25 / 17,
      12.7 / 14.2,

      1.5 / 17,
      1.5 / 14.2,
      15.5 / 17,
      1.5 / 14.2,
      15.5 / 17,
      12.7 / 14.2,
      1.5 / 17,
      12.7 / 14.2,

      15.5 / 17,
      1.5 / 14.2,
      16.75 / 17,
      1.5 / 14.2,
      16.75 / 17,
      12.7 / 14.2,
      15.5 / 17,
      12.7 / 14.2,

      16.75 / 17,
      1.5 / 14.2,
      17 / 17,
      1.5 / 14.2,
      17 / 17,
      12.7 / 14.2,
      16.75 / 17,
      12.7 / 14.2,

      0,
      1.5 / 14.2,
      0.25 / 17,
      1.5 / 14.2,
      0.25 / 17,
      12.7 / 14.2,
      0,
      12.7 / 14.2,

      1.5 / 17,
      12.7 / 14.2,
      15.5 / 17,
      12.7 / 14.2,
      15.5 / 17,
      13.95 / 14.2,
      1.5 / 17,
      13.95 / 14.2,

      0.25 / 17,
      0,
      15.5 / 17,
      0,
      15.5 / 17,
      1.5 / 14.2,
      0.25 / 17,
      1.5 / 14.2,

      1.5 / 17,
      0,
      15.5 / 17,
      0,
      15.5 / 17,
      0.25 / 14.2,
      1.5 / 17,
      0.25 / 14.2,

      1.5 / 17,
      13.95 / 14.2,
      15.5 / 17,
      13.95 / 14.2,
      15.5 / 17,
      14.2 / 14.2,
      1.5 / 17,
      14.2 / 14.2,
    ]);

    // 设置几何体的属性
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));
    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
    // 计算法线
    geometry.computeVertexNormals();

    // 加载纹理
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/test.webp');
    const normalTexture = textureLoader.load('/c3.jpeg');
    const aoMapTexture = textureLoader.load('/c13.png');

    const material = new THREE.MeshPhysicalMaterial({
      map: texture,
      // color: 0xffffff,
      side: THREE.DoubleSide,
      color: 0xffffff, // 棉布的颜色
      roughness: 1, // 较高的粗糙度
      metalness: 0, // 非金属
      clearcoat: 0, // 无清漆层
      clearcoatRoughness: 1, // 清漆层的粗糙度
      reflectivity: 0, // 较低的反射率
      sheen: 0.5, // 模拟棉布的光泽
      bumpMap: normalTexture, // 凹凸贴图
      bumpScale: 1.5,
      aoMap: aoMapTexture, // 环境光遮蔽贴图
      aoMapIntensity: 0.4, // 环境光遮蔽贴图的强度
    });

    // 创建网格
    const mesh = new THREE.Mesh(geometry, material);

    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // 为材质添加纹理
    material.needsUpdate = true; // 确保材质更新

    //将网格移至中心
    mesh.position.set(-7.25, -5.85, -0.625);

    scene.add(mesh);

    // 渲染循环
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // 处理窗口大小调整
    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []); // 空数组作为依赖，确保只执行一次

  return <div ref={mountRef}></div>;
}
