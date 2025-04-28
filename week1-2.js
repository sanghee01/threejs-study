import * as THREE from "three";

const scene = new THREE.Scene(); // Scene: 3D 객체들이 배치될 컨테이너
const camera = new THREE.PerspectiveCamera( // PerspectiveCamera:원근감을 표현하는 데 사용
  75, // 시야각
  window.innerWidth / window.innerHeight, // 카메라의 비율
  0.1, // 카메라가 볼 수 있는 최소 거리
  1000 // 카메라가 볼 수 있는 최대 거리
);
const renderer = new THREE.WebGLRenderer({ antialias: true }); // WebGLRenderer: 3D 객체를 그리는 렌더러
renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러의 크기를 설정
renderer.setClearColor(0x2a3b4c);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.physicallyCorrectLights = true;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement); // 렌더러를 문서에 추가

const geometry = new THREE.BoxGeometry(1, 1, 1); // BoxGeometry: 3D 객체의 기본 형태, 큐브의 형태와 크기를 정의(큐브의 가로, 세로, 깊이 크기)
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // MeshStandardMaterial: 3D 객체의 표면 색상과 질감을 정의
const cube = new THREE.Mesh(geometry, material); // Mesh: 3D 객체의 기본 형태, 기본 형태와 재질을 결합하여 3D 객체를 생성
scene.add(cube); // 3D 객체를 씬에 추가
camera.position.z = 5; // 카메라의 위치를 설정

// 조명 추가
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true; // 그림자 생성 활성화
scene.add(directionalLight);

// 주변광 추가
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

// 큐브와 바닥에 그림자 설정
cube.castShadow = true; // 그림자 생성

// 바닥 추가
const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x999999 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // 바닥이 되도록 회전
plane.position.y = -1; // 큐브 아래로 위치 조정
plane.receiveShadow = true; // 그림자 받기
scene.add(plane);

function animate() {
  // 장면을 렌더링하는 코드 들어감
  renderer.render(scene, camera); // 카메라의 시점을 기준으로 장면을 그려줌
  cube.rotation.x += 0.01; // 각 프레임마다(일반적으로 1초에 60번) 실행되어 큐브를 축 기준으로 조금씩 회전시킴
  cube.rotation.y += 0.01;
}
renderer.setAnimationLoop(animate);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
