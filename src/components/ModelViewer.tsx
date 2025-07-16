
import { useRef, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, ZoomIn, ZoomOut, Fullscreen } from "lucide-react";

interface ModelViewerProps {
  model?: string;
  isGenerating: boolean;
  job?: any;
}

const ModelViewer = ({ model, isGenerating, job }: ModelViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const controlsRef = useRef<any>(null);
  const modelRef = useRef<any>(null);
  const [isThreeLoaded, setIsThreeLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Load Three.js dynamically with GLTFLoader
  useEffect(() => {
    const loadThreeJS = async () => {
      try {
        // Import Three.js modules dynamically
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js');
        
        // Set up the scene
        if (containerRef.current && !sceneRef.current) {
          const scene = new THREE.Scene();
          scene.background = new THREE.Color(0x1a1a1a);
          
          const camera = new THREE.PerspectiveCamera(
            75,
            containerRef.current.clientWidth / containerRef.current.clientHeight,
            0.1,
            1000
          );
          
          const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true
          });
          renderer.setSize(
            containerRef.current.clientWidth,
            containerRef.current.clientHeight
          );
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
          renderer.outputColorSpace = THREE.SRGBColorSpace;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1;
          
          containerRef.current.appendChild(renderer.domElement);
          
          // Add comprehensive lighting setup
          const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
          scene.add(ambientLight);
          
          const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
          directionalLight.position.set(10, 10, 10);
          directionalLight.castShadow = true;
          directionalLight.shadow.mapSize.width = 2048;
          directionalLight.shadow.mapSize.height = 2048;
          scene.add(directionalLight);

          // Add fill lights
          const fillLight1 = new THREE.DirectionalLight(0x4169E1, 0.3);
          fillLight1.position.set(-10, 5, -10);
          scene.add(fillLight1);

          const fillLight2 = new THREE.DirectionalLight(0xFF6347, 0.2);
          fillLight2.position.set(5, -5, 10);
          scene.add(fillLight2);
          
          // Set up orbit controls
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          controls.enableZoom = true;
          controls.enableRotate = true;
          controls.enablePan = true;
          controls.autoRotate = false;
          controls.autoRotateSpeed = 0.5;
          
          // Add a placeholder when no model is loaded
          if (!model) {
            // Create a stylized room preview
            const roomGroup = new THREE.Group();
            
            // Floor
            const floorGeometry = new THREE.PlaneGeometry(10, 10);
            const floorMaterial = new THREE.MeshPhongMaterial({ 
              color: 0x2a2a2a,
              transparent: true,
              opacity: 0.8
            });
            const floor = new THREE.Mesh(floorGeometry, floorMaterial);
            floor.rotation.x = -Math.PI / 2;
            floor.receiveShadow = true;
            roomGroup.add(floor);

            // Walls
            const wallMaterial = new THREE.MeshPhongMaterial({ 
              color: 0x3a3a3a,
              transparent: true,
              opacity: 0.6
            });

            // Back wall
            const backWallGeometry = new THREE.PlaneGeometry(10, 6);
            const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
            backWall.position.set(0, 3, -5);
            roomGroup.add(backWall);

            // Side walls
            const sideWallGeometry = new THREE.PlaneGeometry(10, 6);
            const leftWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
            leftWall.position.set(-5, 3, 0);
            leftWall.rotation.y = Math.PI / 2;
            roomGroup.add(leftWall);

            // Add some furniture placeholders
            const furniture = [];
            
            // Table
            const tableGeometry = new THREE.BoxGeometry(2, 0.1, 1);
            const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
            const table = new THREE.Mesh(tableGeometry, tableMaterial);
            table.position.set(0, 1, 0);
            table.castShadow = true;
            furniture.push(table);

            // Chairs
            for (let i = 0; i < 2; i++) {
              const chairGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
              const chairMaterial = new THREE.MeshPhongMaterial({ color: 0x654321 });
              const chair = new THREE.Mesh(chairGeometry, chairMaterial);
              chair.position.set(i === 0 ? -1.5 : 1.5, 0.5, 0);
              chair.castShadow = true;
              furniture.push(chair);
            }

            furniture.forEach(item => roomGroup.add(item));
            scene.add(roomGroup);
            modelRef.current = roomGroup;
          }
          
          camera.position.set(5, 5, 8);
          controls.target.set(0, 2, 0);
          camera.lookAt(0, 2, 0);
          
          // Store references
          sceneRef.current = scene;
          rendererRef.current = renderer;
          cameraRef.current = camera;
          controlsRef.current = controls;
          
          // Animation loop
          const animate = () => {
            requestAnimationFrame(animate);
            
            controls.update();
            renderer.render(scene, camera);
          };
          animate();
          
          setIsThreeLoaded(true);
        }
      } catch (error) {
        console.error('Failed to load Three.js:', error);
      }
    };

    loadThreeJS();

    // Cleanup
    return () => {
      if (rendererRef.current && containerRef.current) {
        try {
          containerRef.current.removeChild(rendererRef.current.domElement);
        } catch (e) {
          // Element might already be removed
        }
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Load 3D model when model prop changes
  useEffect(() => {
    const loadModel = async () => {
      if (!model || !sceneRef.current || !isThreeLoaded) return;

      try {
        const THREE = await import('three');
        const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');
        const loader = new GLTFLoader();
        
        // Remove existing model
        if (modelRef.current) {
          sceneRef.current.remove(modelRef.current);
        }

        loader.load(
          model,
          async (gltf) => {
            console.log('Model loaded successfully');
            const loadedModel = gltf.scene;
            
            // Scale and position the model
            const box = new THREE.Box3().setFromObject(loadedModel);
            const size = box.getSize(new THREE.Vector3()).length();
            const center = box.getCenter(new THREE.Vector3());
            
            loadedModel.position.x += (loadedModel.position.x - center.x);
            loadedModel.position.y += (loadedModel.position.y - center.y);
            loadedModel.position.z += (loadedModel.position.z - center.z);
            
            // Scale to fit in scene
            const scaleFactor = 4 / size;
            loadedModel.scale.setScalar(scaleFactor);
            
            // Enable shadows
            loadedModel.traverse((child: any) => {
              if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
              }
            });
            
            sceneRef.current.add(loadedModel);
            modelRef.current = loadedModel;
            
            // Auto-rotate for better showcase
            if (controlsRef.current) {
              controlsRef.current.autoRotate = true;
            }
          },
          (progress) => {
            console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%');
          },
          (error) => {
            console.error('Error loading model:', error);
          }
        );
      } catch (error) {
        console.error('Error setting up model loader:', error);
      }
    };

    loadModel();
  }, [model, isThreeLoaded]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && cameraRef.current && rendererRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = () => {
    if (model) {
      window.open(model, '_blank');
    }
  };

  const handleReset = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(5, 5, 8);
      controlsRef.current.target.set(0, 2, 0);
      controlsRef.current.update();
    }
  };

  const handleZoomIn = () => {
    if (cameraRef.current) {
      const direction = cameraRef.current.position.clone().normalize();
      cameraRef.current.position.add(direction.multiplyScalar(-0.5));
      if (controlsRef.current) {
        controlsRef.current.update();
      }
    }
  };

  const handleZoomOut = () => {
    if (cameraRef.current) {
      const direction = cameraRef.current.position.clone().normalize();
      cameraRef.current.position.add(direction.multiplyScalar(0.5));
      if (controlsRef.current) {
        controlsRef.current.update();
      }
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">3D Model Viewer</h3>
          {(model || isThreeLoaded) && (
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={toggleFullscreen}>
                <Fullscreen className="w-4 h-4" />
              </Button>
              {model && (
                <Button variant="outline" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        <div
          ref={containerRef}
          className="relative w-full h-[400px] bg-gradient-dark rounded-lg border border-border/30 overflow-hidden cursor-grab active:cursor-grabbing"
        >
          {isGenerating ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                <div className="space-y-2">
                  <p className="text-foreground font-medium">Generating your 3D model...</p>
                  <p className="text-muted-foreground text-sm">AI is enhancing your prompt and creating the space</p>
                  {job && job.progress > 0 && (
                    <div className="w-48 mx-auto">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{job.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all" 
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : !isThreeLoaded ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto animate-glow opacity-50" />
                <p className="text-muted-foreground">Loading 3D viewer...</p>
              </div>
            </div>
          ) : (
            // Three.js will render here
            null
          )}
        </div>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {model ? 
              "Click and drag to rotate • Scroll to zoom • Right-click and drag to pan" :
              "Preview mode • Use the wizard to generate your 3D space"
            }
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ModelViewer;
