import * as THREE from "three";

const scene = new THREE.Scene(); // Scene: 3D 객체들이 배치될 컨테이너
const camera = new THREE.PerspectiveCamera( // PerspectiveCamera:원근감을 표현하는 데 사용
  75, // 시야각
  window.innerWidth / window.innerHeight, // 카메라의 비율
  0.1, // 카메라가 볼 수 있는 최소 거리
  1000 // 카메라가 볼 수 있는 최대 거리
);
const renderer = new THREE.WebGLRenderer(); // WebGLRenderer: 3D 객체를 그리는 렌더러
renderer.setSize(window.innerWidth, window.innerHeight); // 렌더러의 크기를 설정
renderer.setClearColor(0x808080); // 회색 배경색 설정
document.body.appendChild(renderer.domElement); // 렌더러를 문서에 추가

const geometry = new THREE.BoxGeometry(1, 1, 1); // BoxGeometry: 3D 객체의 기본 형태, 큐브의 형태와 크기를 정의(큐브의 가로, 세로, 깊이 크기)
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // MeshBasicMaterial: 3D 객체의 표면 색상과 질감을 정의
const cube = new THREE.Mesh(geometry, material); // Mesh: 3D 객체의 기본 형태, 기본 형태와 재질을 결합하여 3D 객체를 생성
scene.add(cube); // 3D 객체를 씬에 추가
camera.position.z = 5; // 카메라의 위치를 설정

function animate() {
  // 장면을 렌더링하는 코드 들어감
  renderer.render(scene, camera); // 카메라의 시점을 기준으로 장면을 그려줌
}
renderer.setAnimationLoop(animate);
