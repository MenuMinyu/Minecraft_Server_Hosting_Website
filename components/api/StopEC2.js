'use client'
export async function StopEC2() {
    
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_EC2_STOP)
            const data = await res.json();
            console.log(data)
        } catch (error) {
            console.log(error.json)
        }
    }
