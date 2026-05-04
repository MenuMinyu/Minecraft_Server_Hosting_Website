'use client'
export async function StopModdedEC2() {
    
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_MODDED_EC2_STOP)
            const data = await res.json();
            console.log(data)
        } catch (error) {
            console.log(error.json)
        }
    }
