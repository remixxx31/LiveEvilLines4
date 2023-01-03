import './App.css'
import { useEffect } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import dcmjs from 'dcmjs'

export default function App() {

  const onChange = async (e) => {
    const fileObject = e.target.files[0]
    console.log(fileObject)
    const metadata = await readDicomFile(fileObject
    )
    console.log(metadata)
    const dvhSequence = metadata.dict['30040050']['Value']
    const structureSet = dvhSequence[0]
    console.log(structureSet)
    const data = structureSet['30040058']['Value'][0]
    console.log(data)
    const valuesArray = new Float32Array(data)

    console.log(valuesArray)

  }

  return (
    <div>
      <main>
        React ⚛️ + Vite ⚡ + Replit 🌀
      </main>
      <section>
        <input type="file" onChange={onChange} />
        <DVHChart />
      </section>
    </div>
  )

interface DVHData {
  name: number;
  cc: number;
  gray: number;
}

const data: DVHData[] = [
  {
    name: 0,
    cc: 4000,
    gray: 2400,
  },
  {
    name: 10,
    uv: 3000,
    pv: 1398,
  },
  {
    name: 20,
    uv: 2000,
    pv: 9800,
  },
  {
    name: 30,
    uv: 2780,
    pv: 3908,
  },
  {
    name: 40,
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 50,
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 60,
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 70,
    uv: 3490,
    pv: 4300,
    amt: 2000
  },
  {
    name: 80,
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 90,
    uv: 3490,
    pv: 4300,
    amt: 2100
  },
  {
    name: 100,
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
  // ...
];

const readDicomFile = (file: File) => {
  return __pFileReader(file).then(reader => {
    const arrayBuffer = reader.result
    const originalDicomDict = dcmjs.data.DicomMessage.readFile(arrayBuffer)
    return originalDicomDict
  }).catch((error) => {
    throw error
  })
  //console.log(Object.keys(metadata))

}

const __pFileReader = (file: File) => {
  return new Promise((resolve, reject) => {
    var fr = new FileReader();
    fr.readAsArrayBuffer(file);
    fr.onload = () => {
      resolve(fr);
    }
  });
}


function DVHChart() {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{
        top: 5, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dose:Gray" />
      <YAxis dataKey="response" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="response" stroke="#8884d8" />
    </LineChart>
  );
}
