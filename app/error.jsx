"use client";

export default function Error({ error }) {
  return (
    <main className="error">
      <h1>An Error Occured!</h1>
      <p>Failed to fetch Meals data, please try again after sometime!</p>
    </main>
  );
}
