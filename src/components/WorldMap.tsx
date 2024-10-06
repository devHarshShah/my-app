import React, { useState, useRef, useEffect } from 'react';

const WorldMap = () => {
  const [popoverContent, setPopoverContent] = useState('');
  const [popoverPosition, setPopoverPosition] = useState({ x: 0, y: 0 });
  const popoverRef = useRef(null);

  const svgData = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>World Map</title>
    </head>
    <style>
      /* ... (keep the existing CSS styles) ... */
    </style>
    <body>
      <svg viewBox="0 0 845.2 458">
        <circle class="st0 pin two" cx="643" cy="103.5" r="4.9" data-country="rus"/>
        <circle class="st0 pin two" cx="636.2" cy="259.5" r="4.9" data-country="vie"/>
        <circle class="st0 pin two" cx="636.2" cy="293.4" r="4.9" data-country="sig"/>
        <circle class="st0 pin two" cx="629.4" cy="239.2" r="4.9" data-country="thi"/>
        <circle class="st0 pin one" cx="575.2" cy="252.7" r="4.9" data-country="ind"/>
        <circle class="st0 pin two" cx="514.1" cy="239.2" r="4.9" data-country="uae"/>
        <circle class="st0 pin one" cx="385.3" cy="144.2" r="4.9" data-country="uk"/>
        <circle class="st0 pin two" cx="487" cy="218.8" r="4.9" data-country="jor"/>
        <circle class="st0 pin one" cx="480.2" cy="212" r="4.9" data-country="isrl"/>
        <circle class="st0 pin two" cx="466.7" cy="232.4" r="4.9" data-country="egy"/>
        <circle class="st0 pin two" cx="453.1" cy="361.3" r="4.9" data-country="saf"/>
        <circle class="st0 pin two" cx="439.5" cy="117.1" r="4.9" data-country="fin"/>
        <circle class="st0 pin one" cx="432.8" cy="157.8" r="4.9" data-country="pol"/>
        <circle class="st0 pin one" cx="432.8" cy="198.5" r="4.9" data-country="gre"/>
        <circle class="st0 pin two" cx="426" cy="178.1" r="4.9" data-country="aus"/>
        <circle class="st0 pin two" cx="419.2" cy="117.1" r="4.9" data-country="nor"/>
        <circle class="st0 pin two" cx="419.2" cy="144.2" r="4.9" data-country="den"/>
        <circle class="st0 pin one" cx="419.2" cy="164.6" r="4.9" data-country="grm"/>
        <circle class="st0 pin one" cx="419.2" cy="184.9" r="4.9" data-country="itly"/>
        <circle class="st0 pin one" cx="412.4" cy="171.3" r="4.9" data-country="swt"/>
        <circle class="st0 pin two" cx="405.6" cy="164.6" r="4.9" data-country="bel"/>
        <circle class="st0 pin one" cx="398.8" cy="171.3" r="4.9" data-country="fra"/>
        <circle class="st0 pin one" cx="385.3" cy="191.7" r="4.9" data-country="spn"/>
        <circle class="st0 pin two" cx="263.2" cy="293.4" r="4.9" data-country="bra" />
      </svg>
      <div id="popover" class="popover" style={{ display: 'none' }}>{popoverContent}</div>
    </body>
    <script>
      const circles = document.querySelectorAll(".pin");
      
      function handleMouseover(e) {
        clearInterval(divChangeInterval);
        const countryCode = e.target.getAttribute("data-country");
        document.getElementById(countryCode).style.color = "orange";
        e.target.style.fill = "orange";

        popoverRef.current.style.display = "block";
        popoverRef.current.textContent = countryCode;
        popoverRef.current.style.top = {e.clientY + 10}px;
        popoverRef.current.style.left = {e.clientX + 10}px;
      }

      function handleMouseout(e) {
        divChangeInterval = setInterval(() => {
          // ... (existing code)
        }, 6000);

        const countryCode = e.target.getAttribute("data-country");
        e.target.style.fill = "rgb(248,209,76)";
        document.getElementById(countryCode).style.color = "white";

        popoverRef.current.style.display = "none";
      }
    </script>
  `;

  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      const div1 = document.getElementById("div1");
      const div2 = document.getElementById("div2");
      const one = document.querySelectorAll(".one");
      const two = document.querySelectorAll(".two");
      let showDiv1 = true;

      div1.style.opacity = "0";
      div2.style.opacity = "1";
      div2.style.filter = "blur(0px)";
      for (let i = 0; i < one.length; i++) {
        one[i].style.opacity = "0";
      }
      for (let i = 0; i < two.length; i++) {
        two[i].style.opacity = "1";
      }

      let divChangeInterval = setInterval(() => {
        if (showDiv1) {
          div1.style.opacity = "0";
          div2.style.opacity = "1";
          for (let i = 0; i < one.length; i++) {
            one[i].style.opacity = "0";
          }
          for (let i = 0; i < two.length; i++) {
            two[i].style.opacity = "1";
          }

          div2.style.filter = "blur(0px)";
        } else {
          div1.style.opacity = "1";
          div1.style.filter = "blur(0px)";
          div2.style.opacity = "0";
          for (let i = 0; i < one.length; i++) {
            one[i].style.opacity = "1";
          }
          for (let i = 0; i < two.length; i++) {
            two[i].style.opacity = "0";
          }
        }

        showDiv1 = !showDiv1;
      }, 6000);
    `;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <iframe
        srcDoc={svgData}
        title="WorldMap"
        width={window.innerWidth - 3}
        height={window.innerHeight - 7}
      />
    </div>
  );
};

export default WorldMap;