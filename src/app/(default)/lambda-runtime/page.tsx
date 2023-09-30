"use client";
import { useState, useEffect } from "react";

type RuntimeInfo = {
  aws_execution_env: string;
  version: string;
  time: string;
};

async function getRuntimes(setRuntimes) {
  const data = await fetch(
    "https://drobr13dalzke.cloudfront.net/runtime_summary.json",
  );
  const runtimes = await data.json();
  console.log({ runtimes });
  setRuntimes(runtimes);
}

export default function PageLambdaRuntime() {
  const [runtimes, setRuntimes] = useState<RuntimeInfo[] | null>(null);

  useEffect(() => {
    if (runtimes != null) {
      return;
    }
    getRuntimes(setRuntimes);
  }, [runtimes]);

  let data = (
    <progress className="progress is-large is-primary" max="100"></progress>
  );

  if (runtimes != null) {
    const trs = runtimes.map((item) => (
      <tr key={item.aws_execution_env}>
        <td>{item.aws_execution_env}</td>
        <td style={{ whiteSpace: "pre-line" }}>{item.version}</td>
        <td>{item.time}</td>
      </tr>
    ));
    data = (
      <table className="table is-fullwidth">
        <thead>
          <tr>
            <th>AWS_EXECUTION_ENV</th>
            <th>VERSION</th>
            <th>最終確認日時</th>
          </tr>
        </thead>
        <tbody>{trs}</tbody>
      </table>
    );
  }

  return (
    <div>
      <h1 style={{ fontSize: "2rem", marginBottom: "2rem" }}>
        Lambda Runtime Version
      </h1>
      {data}
    </div>
  );
}
