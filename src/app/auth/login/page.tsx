'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Image from 'next/image'

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex items-center justify-center p-10 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="mt-6 text-3xl font-bold text-gray-900">
                            {isLogin ? 'Bienvenido a MedFlow' : 'Crea tu cuenta en MedFlow'}
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
                            {' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                {isLogin ? 'Regístrate' : 'Inicia sesión'}
                            </button>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Correo electrónico
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Correo electrónico"
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="sr-only">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete={isLogin ? 'current-password' : 'new-password'}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Contraseña"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <Eye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {isLogin && (
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Recuérdame
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                {isLogin ? 'Iniciar sesión' : 'Registrarse'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    O {isLogin ? 'continúa' : 'regístrate'} con
                                </span>
                            </div>
                        </div>
                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <a
                                    href="#"
                                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                                    </svg>
                                    Gmail
                                </a>
                            </div>
                            <div>
                                <a
                                    href="#"
                                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                                    </svg>
                                    Apple ID
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden lg:block relative w-0 flex-1">
                <Image
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Imagen de atención médica"
                    width={2070}
                    height={1380}
                />
            </div>
        </div>
    )
}