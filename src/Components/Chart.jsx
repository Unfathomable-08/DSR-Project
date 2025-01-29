import { useEffect, useRef } from 'react'
import { Chart, BarElement, BarController, CategoryScale, LinearScale, Legend, Tooltip, plugins, Filler, LineController, LineElement, PointElement } from 'chart.js'

Chart.register(BarController, BarElement, Filler, CategoryScale, LinearScale, Legend, Tooltip, plugins, LineController, LineElement, PointElement);

export const Bar = () => {
    const canvas = useRef(null);

    useEffect(() => {
        const ctx = canvas.current.getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Label A', 'Label B', 'Label C', 'Label D', 'Label E'],
                datasets: [{
                    label: "Progress",
                    data: [25, 25, 10, 58, 12],
                    backgroundColor: '#001696',
                    borderColor: '#001696',
                    borderWidth: 1
                }]
            },
            options: {
                aspectRatio: 1.6,
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#001696'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        border: {
                            color: '#001696'
                        },
                        ticks: {
                            color: '#001696'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        border: {
                            color: '#001696'
                        },
                        ticks: {
                            color: '#001696'
                        }
                    }
                }
            }
        })
    }, [])
    
    return (
        <div>
            <canvas ref={canvas}></canvas>
        </div>
    )
}

export const ChartLine = () => {
    const line = useRef(null)

    useEffect(() => {
        const ctx = line.current.getContext('2d')
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr'],
                datasets: [{
                    label: 'Sales',
                    data: [10, 20, 30, 40],
                    backgroundColor: '#001696',
                    borderColor: '#001696',
                    borderWidth: 1

                }]
            },
            options: {
                aspectRatio: 2,
                responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#001696'
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        border: {
                            color: '#001696'
                        },
                        ticks: {
                            color: '#001696'
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        },
                        border: {
                            color: '#001696'
                        },
                        ticks: {
                            color: '#001696'
                        }
                    }
                }
            }
        })
    }, [])

    return (
        <>
            <canvas ref={line}></canvas>
        </>
    )
}