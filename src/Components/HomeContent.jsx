import React from 'react';
import { Upload, Image, Camera } from "lucide-react"
import { NavLink } from 'react-router-dom';

const Button = ({ children, className, ...props }) => (
    <button className="relative overflow-hidden bg-purple-600 text-white hover:bg-purple-700 text-lg px-8 py-4 rounded-lg transition-all duration-300">
      {children}
    </button>
)

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-gray-800/50 p-6 rounded-xl hover:bg-gray-800/70 transition-all duration-300 border border-gray-700 hover:border-purple-500">
        <Icon className="w-8 h-8 text-purple-500 mb-4" />
        <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
) 

const HomeContent = () => {
  return (
    <main className="flex-grow container mx-auto pb-5">
        <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-6xl font-bold mb-6 p-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Albumify
            </h1>
            <p className="text-xl mb-12 text-gray-300">
                Where AI Meets Memories - Transform set Photos into Smart, Organized Albums
            </p>
            
            <div className="flex justify-center gap-4 mb-16">
                <NavLink to="/upload">
                    <Button className="bg-purple-600 text-white hover:bg-purple-700 text-lg px-8 py-4">
                        <Upload className="w-5 h-5" />
                        Upload Image
                    </Button> 
                </NavLink>
                <Button className="border border-purple-500 text-purple-500 hover:bg-purple-500/10 text-lg px-8 py-4">
                    Learn More
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
                <FeatureCard 
                    icon={Upload}
                    title="Easy Upload"
                    description="Drag and drop or click to upload your images instantly"
                />
                <FeatureCard 
                    icon={Image}
                    title="Smart Processing"
                    description="Advanced classifications to find your best photos"
                />
                <FeatureCard 
                    icon={Camera}
                    title="One Click Upload"
                    description="Upload the face you want to classify and that's it!"
                />
            </div>
        </div>
    </main>
  );
};

export default HomeContent;