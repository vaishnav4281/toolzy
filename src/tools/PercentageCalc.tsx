import { useState } from "react";
import { TrustBadge } from "@/components/TrustBadge";

export default function PercentageCalc() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <PercentOfCard />
      <WhatPercentCard />
      <PercentChangeCard />
    </div>
  );
}

function PercentOfCard() {
  const [p, setP] = useState(20);
  const [y, setY] = useState(150);
  return <Shell title="What is X% of Y?"><Row a={p} sa={setP} b={y} sb={setY} al="%" bl="of" out={(p / 100) * y} /></Shell>;
}
function WhatPercentCard() {
  const [x, setX] = useState(30);
  const [y, setY] = useState(150);
  return <Shell title="X is what % of Y?"><Row a={x} sa={setX} b={y} sb={setY} al="of" bl="=" out={y === 0 ? 0 : (x / y) * 100} suffix="%" /></Shell>;
}
function PercentChangeCard() {
  const [a, setA] = useState(80);
  const [b, setB] = useState(100);
  return <Shell title="% change from A to B"><Row a={a} sa={setA} b={b} sb={setB} al="→" bl="=" out={a === 0 ? 0 : ((b - a) / a) * 100} suffix="%" /></Shell>;
}

function Shell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-premium p-5">
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      {children}
      <TrustBadge />
    </div>
  );
}

function Row({ a, sa, b, sb, al, bl, out, suffix = "" }: { a: number; sa: (n: number) => void; b: number; sb: (n: number) => void; al: string; bl: string; out: number; suffix?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <input type="number" value={a} onChange={(e) => sa(+e.target.value)} className="w-full rounded-md border border-input bg-card px-2 py-2 text-sm" />
        <span className="text-xs">{al}</span>
        <input type="number" value={b} onChange={(e) => sb(+e.target.value)} className="w-full rounded-md border border-input bg-card px-2 py-2 text-sm" />
        <span className="text-xs">{bl}</span>
      </div>
      <div className="mt-2 rounded-md bg-primary/10 px-3 py-3 text-center text-lg font-semibold text-primary">{round(out)}{suffix}</div>
    </div>
  );
}

function round(n: number) { return Number.isFinite(n) ? Math.round(n * 1000) / 1000 : 0; }