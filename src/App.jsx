import { useCallback, useEffect, useState ,useRef} from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  //useRef hook
  //use to take the reference of value
  // The useRef is a hook that allows to directly create a reference to the DOM element in the functional component.
  const passwordRef=useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    } 
    if (charAllowed) {
      str += "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length+1));
    }
    // console.log(pass);
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPassword=useCallback(()=>{
    // targeting particular referance
    // console.log(passwordRef.current.value)
    passwordRef.current?.select()//taking reference
    //selecting only particular range of characters in password
    // passwordRef.current?.setSelectionRange(0,4)
    window.navigator.clipboard.writeText(password)
  },[password])
  useEffect(()=>{passwordGenerator()},[length,numberAllowed, charAllowed, setPassword]);
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-slate-600">
        <h1 className="text-white text-xl text-center my-3">
          PasswordGenerator
        </h1>
        <div className="flex  mb-4 overflow-hidden bg-white rounded-lg text-black">
          <input
            type="text"
            value={password}
            readOnly
            className="outline-none w-full py-1 px-3 bg-white rounded-lg"
            placeholder="password"
            ref={passwordRef}
          ></input>
          <button 
          className="bg-blue-700 px-3 py-2 shrink-0"
          onClick={copyPassword}
          >copy</button>
        </div>
        <div className="flex justify-between text-sm gap-x-1">
          <div className="flex items-center gap-x-1">
            <input
              className="cursor-pointer"
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="font-bold">Length:{length}</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="inputNumber"
              defaultChecked={numberAllowed}
              onChange={(e) => {
                setNumberAllowed((pre) => (pre = !pre));
              }}
            />
            <label htmlFor="inputNumber">Number</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="inputchar"
              defaultChecked={charAllowed}
              onChange={(e) => {
                setCharAllowed((pre) => (pre = !pre));
              }}
            />
            <label htmlFor="inputchar">Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

//useCallback is a React Hook that is used to memoize functions, preventing unnecessary re-creations
//  of functions in child components, especially in scenarios where the function is passed as a prop

//useCallback(fn,[dependencies])

//useEffect(()=>{},[dependencies]); //empty dependency array means it will run once and only once.
