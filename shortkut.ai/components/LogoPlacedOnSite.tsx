import { IconX } from "@tabler/icons"
import { useState } from "react"
import Draggable from "react-draggable"

const logo = require("../assets/logo.png")

function LogoPlacedOnSite({ onClick /* onClose*/ }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  return (
    <Draggable>
      <div
        onClick={onClick}
        style={{
          backgroundColor: "white",
          position: "fixed",
          bottom: "10vh",
          right: "0.5vh",
          width: "60px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "100%",
          cursor: "pointer",
          zIndex: 99999,
          
        }}>
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          
          style={{
            width: isHovered ? "35px" : "30px", // increase size when hovered
            height: isHovered ? "35px" : "30px",
            backgroundImage: `url(${logo})`,
            backgroundSize: "contain",
            cursor: "pointer",
            
          }}
        />
      </div>
    </Draggable>

    // <Draggable
    //   onStart={() => setIsDragging(true)}
    //   onStop={() => setIsDragging(false)}
    // >
    //   <div
    //     style={{
    //       position: 'absolute',
    //       bottom: '20px',
    //       right: '20px',
    //       width: '70px',
    //       height: '70px',
    //       backgroundColor: 'white',
    //       borderRadius: '50%',
    //       overflow: 'hidden',
    //       cursor: 'pointer',
    //       zIndex: 99999,
    //     }}
    //   >
    //     <div
    //       onMouseEnter={() => setIsHovered(true)}
    //       onMouseLeave={() => setIsHovered(false)}
    //       onClick={(e) => {
    //         if (!isDragging) {
    //           onClick(e);
    //         }
    //       }}
    //       style={{
    //         position: 'absolute',
    //         bottom: 0,
    //         right: 0,
    //         width: '100%',
    //         height: '100%',
    //         backgroundImage: `url(${logo})`, // Use required image here
    //         backgroundSize: 'contain',
    //         transition: 'all 0.3s ease',
    //       }}
    //     >
    //       {isHovered && (
    //         <div
    //           onClick={(e) => {
    //             e.stopPropagation();
    //             onClose();
    //           }}
    //           style={{
    //             position: 'absolute',
    //             top: 0,
    //             right: 0,
    //             width: '20px',
    //             height: '20px',
    //             backgroundColor: 'red',
    //             color: 'white',
    //             cursor: 'pointer',
    //           }}
    //         >
    //           x
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </Draggable>
  )
}

export default LogoPlacedOnSite
