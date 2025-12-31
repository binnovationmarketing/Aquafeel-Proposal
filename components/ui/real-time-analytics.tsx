"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { TrendingUp, AlertCircle, Info } from "lucide-react"

interface DataPoint {
  year: number
  traditional: number
  aquafeel: number
}

interface ComponentProps {
  initialMonthly: number
  fixedMonthly: number
  lang: string
}

export function Component({ initialMonthly, fixedMonthly, lang }: ComponentProps) {
  const [data, setData] = useState<DataPoint[]>([])
  const [drawProgress, setDrawProgress] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const width = 800
  const height = 400
  const padding = { top: 40, right: 120, bottom: 50, left: 60 }
  const totalYears = 10

  useEffect(() => {
    // Generate projection data with 7% annual inflation
    const points: DataPoint[] = []
    let currentTrad = initialMonthly
    for (let i = 0; i <= totalYears; i++) {
      points.push({
        year: i,
        traditional: currentTrad,
        aquafeel: fixedMonthly
      })
      currentTrad = currentTrad * 1.07 // 7% increase
    }
    setData(points)

    // Slow motion animation
    let start: number | null = null
    const duration = 5000 // 5 seconds to draw
    const animate = (time: number) => {
      if (!start) start = time
      const progress = Math.min((time - start) / duration, 1)
      setDrawProgress(progress)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [initialMonthly, fixedMonthly])

  const maxVal = Math.max(...data.map(d => d.traditional)) * 1.1

  const getX = (year: number) => padding.left + (year / totalYears) * (width - padding.left - padding.right)
  const getY = (value: number) => height - padding.bottom - (value / maxVal) * (height - padding.top - padding.bottom)

  const getLinePath = (key: 'traditional' | 'aquafeel') => {
    if (data.length < 2) return ""
    const visiblePoints = Math.ceil(data.length * drawProgress)
    return data
      .slice(0, visiblePoints)
      .map((point, i) => {
        const x = getX(point.year)
        const y = getY(point[key])
        return `${i === 0 ? "M" : "L"} ${x},${y}`
      })
      .join(" ")
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * width
    const year = Math.round(((x - padding.left) / (width - padding.left - padding.right)) * totalYears)
    if (year >= 0 && year <= totalYears) {
      setHoveredIndex(year)
    }
  }

  const translations = {
    pt: { title: "A Armadilha da Inflação", sub: "Projeção 10 anos (Inflação 7%)", trad: "Tradicional", fixed: "Fixo Aquafeel", avg: "Média", peak: "Fim do Ciclo", insight: "Há 10 anos, água custava $2.50. Hoje custa $5.00." },
    en: { title: "The Inflation Trap", sub: "10-Year Projection (7% Inflation)", trad: "Traditional", fixed: "Fixed Aquafeel", avg: "Average", peak: "Final Year", insight: "10 years ago, water was $2.50. Today it's $5.00." },
    es: { title: "La Trampa de Inflación", sub: "Proyección 10 años (7% Inflación)", trad: "Tradicional", fixed: "Aquafeel Fijo", avg: "Média", peak: "Fin de Ciclo", insight: "Hace 10 años, agua costaba $2.50. Hoy cuesta $5.00." }
  }[lang] || { title: "A Armadilha da Inflação", sub: "Projeção 10 anos (Inflação 7%)", trad: "Tradicional", fixed: "Fixo Aquafeel", avg: "Média", peak: "Fim do Ciclo", insight: "Há 10 anos, água custava $2.50. Hoje custa $5.00." }

  return (
    <div className="w-full bg-black py-12 px-4 rounded-[2rem] border border-white/5 mt-16 shadow-2xl">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-2">
              <TrendingUp className="text-red-500" />
              {translations.title}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">{translations.sub}</p>
          </div>
          <div className="bg-red-600/10 border border-red-500/20 px-4 py-2 rounded-xl flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
             <span className="text-red-500 font-black text-xs uppercase tracking-widest">LIVE PROJECTION</span>
          </div>
        </div>

        <div className="relative bg-[#111] rounded-3xl p-6 border border-white/10 overflow-hidden">
          <svg
            ref={svgRef}
            width="100%"
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredIndex(null)}
            className="cursor-crosshair"
          >
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((percent) => {
              const val = (percent / 100) * maxVal
              return (
                <g key={percent}>
                  <line
                    x1={padding.left}
                    y1={getY(val)}
                    x2={width - padding.right}
                    y2={getY(val)}
                    stroke="#ffffff10"
                    strokeDasharray="4 4"
                  />
                  <text x={padding.left - 10} y={getY(val)} fill="#666" fontSize="10" textAnchor="end" dominantBaseline="middle">
                    ${Math.round(val)}
                  </text>
                </g>
              )
            })}

            {/* Traditional Line */}
            <path d={getLinePath('traditional')} fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
            
            {/* Aquafeel Fixed Line */}
            <path d={getLinePath('aquafeel')} fill="none" stroke="#0ea5e9" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_rgba(14,165,233,0.4)]" />

            {/* Labels at end of lines */}
            {drawProgress === 1 && (
              <>
                <text x={getX(10) + 10} y={getY(data[10].traditional)} fill="#ef4444" fontSize="12" fontWeight="bold" dominantBaseline="middle">
                  {translations.trad} (${Math.round(data[10].traditional)})
                </text>
                <text x={getX(10) + 10} y={getY(data[10].aquafeel)} fill="#0ea5e9" fontSize="12" fontWeight="bold" dominantBaseline="middle">
                  Aquafeel (${Math.round(data[10].aquafeel)})
                </text>
              </>
            )}

            {/* Tooltip vertical line */}
            {hoveredIndex !== null && (
              <line x1={getX(hoveredIndex)} y1={padding.top} x2={getX(hoveredIndex)} y2={height - padding.bottom} stroke="#ffffff20" />
            )}
          </svg>

          {/* Floating Insight */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between p-6 bg-white/5 border border-white/10 rounded-2xl">
             <div className="flex items-center gap-4">
                <div className="bg-red-600 p-3 rounded-xl shadow-lg">
                  <AlertCircle className="text-white" size={24} />
                </div>
                <p className="text-slate-300 text-sm font-medium leading-relaxed italic">
                  "{translations.insight}"
                </p>
             </div>
             <div className="bg-blue-600 px-6 py-2 rounded-full text-white font-black text-xs uppercase tracking-tighter animate-pulse shrink-0">
               Investimento Fixo é Sobrevivência
             </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
           <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{translations.avg}</span>
              <div className="text-2xl font-black text-white mt-1">${Math.round(data.reduce((a,b) => a+b.traditional, 0) / data.length)}</div>
           </div>
           <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{translations.peak}</span>
              <div className="text-2xl font-black text-red-500 mt-1">${Math.round(data[10]?.traditional || 0)}</div>
           </div>
           <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 col-span-2 md:col-span-1">
              <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Opção Liquidar</span>
              <div className="text-lg font-black text-emerald-500 mt-1 uppercase">Sempre disponível</div>
           </div>
        </div>
      </div>
    </div>
  )
}
