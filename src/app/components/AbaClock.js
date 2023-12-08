"use client"
// components/AbaClock.js
import { useEffect, useRef } from 'react';

const AbaClock = () => {
  const abaclockRowsRef = useRef([]);
  const timeElRef = useRef(null);
  const digitElsRef = useRef([]);

  useEffect(() => {
    const abaclockRows = document.querySelectorAll('.abaclock > [data-beads]');
    const timeEl = document.querySelector('.abaclock > time');

    if (!abaclockRows || !timeEl) return;

    abaclockRowsRef.current = Array.from(abaclockRows);
    timeElRef.current = timeEl;

    const digitEls = [];

    abaclockRows.forEach((digitEl) => {
      const beads = Number(digitEl.dataset.beads);
      digitEl.style.setProperty('--beads', beads);
      const beadEls = [];

      digitEl.innerHTML = '';

      digitEl.append(
        ...Array.from({ length: beads }, () => {
          const beadEl = document.createElement('i');
          beadEls.push(beadEl);
          return beadEl;
        })
      );

      digitEls.push(beadEls);
    });

    digitElsRef.current = digitEls;

    time();

    function time() {
      const options = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const str = new Date().toLocaleTimeString([], options);

      const digits = str.match(/\d/g);

      if (!digits || digits.length !== digitElsRef.current.length) {
        return;
      }

      digits.forEach((d, di) => {
        const digitEls = digitElsRef.current[di];

        if (digitEls) {
          digitEls.forEach((b, bi) => (b.dataset.active = bi < d));
        }
      });

      timeElRef.current.dateTime = timeElRef.current.innerHTML = str;
      requestAnimationFrame(time);
    }

    return () => {
      cancelAnimationFrame(time);
    };
  }, []);

  return (
    <div className="abaclock">
      <div data-beads={2} style={{ '--color': 'red' }}></div>
      <div data-beads={10} style={{ '--color': 'red' }}></div>
      <div data-beads={6} style={{ '--color': 'yellow' }}></div>
      <div data-beads={10} style={{ '--color': 'yellow' }}></div>
      <div data-beads={6} style={{ '--color': 'green' }}></div>
      <div data-beads={10} style={{ '--color': 'green' }}></div>
      <time></time>
    </div>
  );
};

export default AbaClock;
