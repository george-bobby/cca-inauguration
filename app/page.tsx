'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, BarChart3, Gauge, TreePine, Cloud, Droplets, Car, ShoppingBag, Calculator, MessageSquare, Sparkles } from 'lucide-react';
import * as THREE from 'three';
import { useSpring, animated } from 'react-spring';
import Particles from 'react-particles';
import { loadSlim } from "tsparticles-slim";

interface AnimatedNumberProps {
	value: number;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value }) => {
	const { number } = useSpring({
		from: { number: 0 },
		number: value,
		delay: 200,
		config: { mass: 1, tension: 20, friction: 10 }
	});

	return <animated.span>{number.to((n) => n.toFixed(0))}</animated.span>;
};

const quotes = [
	{
		text: "REDUCE",
		subtext: "Small changes, big impact",
		icon: <Leaf className="w-20 h-20" />,
		color: "#10b981"
	},
	{
		text: "TRACK",
		subtext: "Real-time carbon footprint monitoring",
		icon: <BarChart3 className="w-20 h-20" />,
		color: "#06b6d4"
	},
	{
		text: "IMPROVE",
		subtext: "Your path to sustainability",
		icon: <Gauge className="w-20 h-20" />,
		color: "#3b82f6"
	},
	{
		text: "Take Control",
		subtext: "Of your environmental impact",
		icon: <Calculator className="w-20 h-20" />,
		color: "#8b5cf6"
	},
	{
		text: "Join The Movement",
		subtext: "15,000+ eco-conscious users and growing",
		icon: <MessageSquare className="w-20 h-20" />,
		color: "#10b981"
	}
];

const ParticlesBackground = () => {
	const particlesInit = async (engine: any) => {
		await loadSlim(engine);
	};

	return (
		<Particles
			className="absolute inset-0"
			init={particlesInit}
			options={{
				particles: {
					color: { value: "#10b981" },
					links: {
						color: "#10b981",
						distance: 150,
						enable: true,
						opacity: 0.2,
						width: 1
					},
					move: {
						enable: true,
						speed: 1
					},
					number: {
						value: 50
					},
					opacity: {
						value: 0.3
					},
					size: {
						value: { min: 1, max: 3 }
					}
				}
			}}
		/>
	);
};

const Earth = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

	useEffect(() => {
		if (!containerRef.current || typeof window === 'undefined') return;

		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

		rendererRef.current = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		rendererRef.current.setSize(window.innerWidth, window.innerHeight);
		containerRef.current.appendChild(rendererRef.current.domElement);

		// Enhanced Earth with atmosphere effect
		const earthGeometry = new THREE.SphereGeometry(5, 64, 64);
		const earthMaterial = new THREE.MeshPhongMaterial({
			color: 0x10b981,
			emissive: 0x072534,
			specular: 0x666666,
			shininess: 10,
			bumpScale: 0.5,
		});
		const earth = new THREE.Mesh(earthGeometry, earthMaterial);

		// Atmosphere glow
		const atmosphereGeometry = new THREE.SphereGeometry(5.2, 64, 64);
		const atmosphereMaterial = new THREE.MeshPhongMaterial({
			color: 0x10b981,
			transparent: true,
			opacity: 0.2,
			side: THREE.BackSide
		});
		const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

		scene.add(earth);
		scene.add(atmosphere);

		// Enhanced lighting
		const mainLight = new THREE.DirectionalLight(0xffffff, 1);
		mainLight.position.set(5, 3, 5);
		scene.add(mainLight);

		const ambientLight = new THREE.AmbientLight(0x10b981, 0.4);
		scene.add(ambientLight);

		const backLight = new THREE.DirectionalLight(0x10b981, 0.5);
		backLight.position.set(-5, -3, -5);
		scene.add(backLight);

		camera.position.z = 15;

		// Animation
		const animate = () => {
			requestAnimationFrame(animate);
			earth.rotation.y += 0.002;
			atmosphere.rotation.y += 0.003;
			if (rendererRef.current) {
				rendererRef.current.render(scene, camera);
			}
		};
		animate();

		return () => {
			if (rendererRef.current && containerRef.current) {
				containerRef.current.removeChild(rendererRef.current.domElement);
				rendererRef.current.dispose();
			}
		};
	}, []);

	return <div ref={containerRef} className="absolute inset-0 z-0" />;
};

const FloatingIcons = () => {
	const icons = [<TreePine key="tree" />, <Cloud key="cloud" />, <Droplets key="drops" />, <Sparkles key="sparkles" />];
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) return null;

	return (
		<div className="absolute inset-0 pointer-events-none overflow-hidden">
			{[...Array(20)].map((_, i) => (
				<motion.div
					key={i}
					className="absolute text-green-400/20"
					initial={{
						x: Math.random() * window.innerWidth,
						y: window.innerHeight + 100,
						scale: Math.random() * 0.5 + 0.5
					}}
					animate={{
						y: -100,
						rotate: Math.random() * 360,
						scale: Math.random() * 2 + 1
					}}
					transition={{
						duration: Math.random() * 15 + 15,
						repeat: Infinity,
						ease: "linear"
					}}
				>
					{icons[i % icons.length]}
				</motion.div>
			))}
		</div>
	);
};

export default function Home() {
	const [isLaunching, setIsLaunching] = useState(false);
	const [countdown, setCountdown] = useState(5);
	const [showWebsite, setShowWebsite] = useState(false);
	const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

	useEffect(() => {
		setAudio(new Audio('/launch-music.mp3'));
	}, []);

	useEffect(() => {
		if (isLaunching && countdown > 0) {
			const timer = setInterval(() => {
				setCountdown((prev) => prev - 1);
			}, 2000);

			return () => clearInterval(timer);
		} else if (countdown === 0) {
			setTimeout(() => {
				setShowWebsite(true);
				setTimeout(() => {
					window.location.href = 'https://carbo-tracker.vercel.app/';
				}, 4000);
			}, 2000);
		}
	}, [isLaunching, countdown]);

	const handleLaunch = () => {
		setIsLaunching(true);
		if (audio) {
			audio.play();
		}
	};

	return (
		<div className="min-h-screen bg-mesh text-white flex flex-col items-center justify-center relative overflow-hidden">
			<ParticlesBackground />
			<Earth />
			<FloatingIcons />

			{!isLaunching ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="text-center z-10 relative"
				>
					<motion.div
						className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse-slow"
					/>

					<motion.div
						className="mb-8 animate-float"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ duration: 0.5 }}
					>
						{/* <img
              src="/logo.png"
              alt="Carbo Logo"
              className="w-32 h-32 mx-auto glow"
            /> */}
					</motion.div>

					<motion.div
						className="text-xl font-clash mb-4 tracking-wider"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 }}
					>
						<span className="text-gradient">REDUCE · TRACK · IMPROVE</span>
					</motion.div>

					<motion.h1
						className="text-7xl font-clash font-bold mb-6 text-gradient"
						animate={{
							textShadow: [
								"0 0 20px rgba(52, 211, 153, 0.5)",
								"0 0 40px rgba(52, 211, 153, 0.7)",
								"0 0 20px rgba(52, 211, 153, 0.5)"
							]
						}}
						transition={{ duration: 2, repeat: Infinity }}
					>
						Track Your Carbon Footprint
						<br />
						in Real-Time
					</motion.h1>

					<motion.p
						className="text-2xl mb-12 text-gray-300 max-w-2xl mx-auto font-light"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.5 }}
					>
						Join <span className="font-clash font-medium text-green-400"><AnimatedNumber value={15000} />+</span> eco-conscious users making a difference.
					</motion.p>

					<motion.button
						onClick={handleLaunch}
						className="px-16 py-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-4xl font-clash font-bold relative group overflow-hidden"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<span className="relative z-10 shimmer">Launch</span>
						<motion.div
							className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700"
							initial={{ x: "100%" }}
							whileHover={{ x: 0 }}
							transition={{ duration: 0.3 }}
						/>
					</motion.button>

				</motion.div>
			) : (
				<AnimatePresence mode="wait">
					{countdown > 0 ? (
						<motion.div
							key={countdown}
							initial={{ scale: 0, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 2, opacity: 0 }}
							transition={{ duration: 0.5 }}
							className="text-center z-10 relative"
						>
							<motion.div
								className="absolute -inset-32 bg-gradient-radial from-current to-transparent opacity-10"
								style={{ color: quotes[countdown - 1].color }}
								animate={{ scale: [1, 1.5], opacity: [0.1, 0] }}
								transition={{ duration: 2 }}
							/>

							<motion.div
								animate={{
									rotate: 360,
									scale: [1, 1.2, 1]
								}}
								transition={{ duration: 2 }}
								className="mb-8"
								style={{ color: quotes[countdown - 1].color }}
							>
								{quotes[countdown - 1].icon}
							</motion.div>

							<motion.div
								className="text-[12rem] font-bold mb-4"
								animate={{
									scale: [1, 1.2, 1],
									color: [quotes[countdown - 1].color, '#ffffff'],
								}}
								transition={{ duration: 2 }}
							>
								{countdown}
							</motion.div>

							<motion.h2
								className="text-6xl font-bold mb-2"
								animate={{ y: [20, 0], opacity: [0, 1] }}
								transition={{ duration: 0.3 }}
							>
								{quotes[countdown - 1].text}
							</motion.h2>

							<motion.p
								className="text-2xl text-gray-300"
								animate={{ y: [20, 0], opacity: [0, 1] }}
								transition={{ duration: 0.3, delay: 0.2 }}
							>
								{quotes[countdown - 1].subtext}
							</motion.p>
						</motion.div>
					) : showWebsite ? (
						<motion.div
							className="w-full h-screen fixed inset-0 z-20"
							initial={{ scale: 0, borderRadius: "100%" }}
							animate={{ scale: 1, borderRadius: "0%" }}
							transition={{ duration: 2, ease: [0.76, 0, 0.24, 1] }}
						>
							<motion.div
								className="absolute inset-0 bg-gradient-to-b from-black to-transparent z-30"
								initial={{ opacity: 1 }}
								animate={{ opacity: 0 }}
								transition={{ delay: 1, duration: 1 }}
							/>
							<iframe
								src="https://carbo-tracker.vercel.app/"
								className="w-full h-full"
								style={{ border: 'none' }}
							/>
						</motion.div>
					) : (
						<motion.div
							className="text-center z-10 relative"
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.5 }}
						>
							<motion.h1
								className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600"
								animate={{
									textShadow: [
										"0 0 30px rgba(52, 211, 153, 0.7)",
										"0 0 60px rgba(52, 211, 153, 0.9)",
										"0 0 30px rgba(52, 211, 153, 0.7)"
									]
								}}
							>
								Welcome to the Future of
								<br />
								Carbon Tracking
							</motion.h1>
						</motion.div>
					)}
				</AnimatePresence>
			)}
		</div>
	);
}