"use client"

import dynamic from 'next/dynamic'

const WrappedGlobe = dynamic(() => import('./Globe'), { ssr: false})

export default WrappedGlobe