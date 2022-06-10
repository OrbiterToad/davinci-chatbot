import React, {useEffect, useState} from 'react'

export const Loader = () => {

  const specialCharacters = '!@#$%&*()_+{}<>?[]=€£¥§-^~|EQWXMNBV015948Ø°•ªº¿¡«»ABCDEFGHIJKLMVWXYZ_.-•:*^º'

//  create a loading component that renders random ascii special characters
  // the charachters change every .5 seconds

  const [currentBoldText, setCurrentBoldText] = useState(1)

  function getRandomChar() {
    return specialCharacters[Math.floor(Math.random() * specialCharacters.length)]
    // return String.fromCharCode(Math.floor(Math.random() * (126 - 33)) + 33)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentBoldText === 8) {
        setCurrentBoldText(1)
      } else {
        setCurrentBoldText(currentBoldText + 1)
      }
    }, 200)
    return () => clearInterval(interval)
  }, [currentBoldText])


  return (
    <div className="loader">
      <div>
        <span>{getText(1)}</span>
        <span>{getText(2)}</span>
        <span>{getText(3)}</span>
      </div>
      <div>
        <span>{getText(8)}</span>
        <span>{getText(20)}</span>
        <span>{getText(4)}</span>
      </div>
      <span>{getText(7)}</span>
      <span>{getText(6)}</span>
      <span>{getText(5)}</span>
    </div>
  )

  function getText(number) {
    if (currentBoldText === number) {
      return <b className={'fuschia'}>{getRandomChar()}</b>
    } else if (currentBoldText === number - 1 || currentBoldText === number + 7) {
      return <span className={'yellow'}>{getRandomChar()}</span>
    } else if (currentBoldText === number - 2 || currentBoldText === number + 6) {
      return <span className={'green'}>{getRandomChar()}</span>
    } else {
      return <span className={'grey'}>{getRandomChar()}</span>
    }
  }

}