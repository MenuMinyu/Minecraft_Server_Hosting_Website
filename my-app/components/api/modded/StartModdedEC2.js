'use client'
export async function StartModdedEC2() {
        try {
            console.log('StartEC2 URL=', process.env.NEXT_PUBLIC_MODDED_EC2_START)
            const res = await fetch(process.env.NEXT_PUBLIC_MODDED_EC2_START)
            const data = await res.json();
            console.log(data)
            console.log(process.env.NEXT_PUBLIC_MODDED_EC2_START)
        } catch (error) {
            console.log(error)
            console.log(process.env.NEXT_PUBLIC_MODDED_EC2_START)
        }
    }
