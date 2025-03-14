export default function Contact() {
  return (
    <div className="container p-4 mx-auto">
      <h1 className="text-3xl font-bold">Contact Me</h1>
      <form className="mt-4">
        <input className="block w-full p-2 border" placeholder="Email" />
        <textarea className="block w-full p-2 mt-2 border" placeholder="Message"></textarea>
        <button className="p-2 mt-2 text-white bg-blue-500">Send</button>
      </form>
    </div>
  );
}