"use client"

import React, { useState, useEffect, createContext } from "react";
import { shuffle } from "../helpers";

import megacitiesData from '../data/megacities/megacities.json'
import greetingsData from '../data/greetings/greetings.json'

export const MegaContext = createContext(null);

const MegaProvider = ({ children }) => {

  const [mega, setMega] = useState({
    megacities: [],
    url: "https://digitalcityseries.com/art/megacities/",
    megaIndexSlug: "",
    navOpen: false,
    megaGlobe: true,
    worldReady: true,
    cityWidth: 0,
    cityHeight: 0,

    zoom: 'normal',
    zooming: false,
    imageSize: 'lg',
    controlledPosition: { x: 0, y: 0 },
    offsetPosition: { x: 0, y: 0},
    lgBounds: { left: 0, top: 0, right: 0, bottom: 0 },
    xlBounds: { left: 0, top: 0, right: 0, bottom: 0 },
    fromSeries: false,
    viewOverlay: false,
    overlaySLug: '',
    paginatedLinksState: [],

    megaNavInfoData: {},
    megaNavInfoOpen: false,
    megaNavVideoOpen: false,

    isInitial: true,
    initialImageWidth: 0,
    initialImageLeftMargin: 0,
    initialImageHeight: 0,
    initialImageTopMargin: 0,

    megaNavCities: [],
    navigationOpen: false,
    imageNavOpen: false,
    megaNavOpen: false,
    viewZoomMap: true,
    megaNavWidth: 200,
    megaNavFlagMargin: 200,
    megaNavTopMargin: 49,
    hideAllNavs: false,

    searchFilter: ''
  });

  useEffect(() => {
    const rawMegacities = []
    megacitiesData.map(megacity => {
      return rawMegacities.push(megacity)
    })

    setMega(state => ({ 
        ...state,
        megacities: shuffle(rawMegacities)
    }));
  }, []);


  useEffect(() => {
    var getShuffledCities = mega.megacities;
    getShuffledCities.forEach(function(v,i) {
        if (v.slug === 'skate-city') {
            getShuffledCities.push(getShuffledCities[i])
            getShuffledCities.splice(i, 1)
        }
        if (v.slug === mega.megaIndexSlug) {
            getShuffledCities.unshift(getShuffledCities[i])
            getShuffledCities.splice(i + 1, 1)
        }
    })
    setMega(state => ({ ...state, shuffledMegacities: getShuffledCities }));

    return () => getShuffledCities = {}
  }, [mega.megacities, mega.megaIndexSlug])

  return (
    <MegaContext.Provider
        value={[mega, setMega]}
    >
        {children}
    </MegaContext.Provider>
  );
};

export default MegaProvider;
