export const shuffle = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

export const curvedText = (text, radius) => {
  var chars = text.split("");
  var circleLength = 2 * Math.PI * radius;
  var angleRad = w / (2 * radius);
  var angle = (2 * angleRad * 180) / Math.PI / text.length;
  var returnedText = "";
  var w = 400;

  chars.map((char, idx) => {
    // var transformReturn = `translate(${w / 2}px,0px) rotate(${
    //   idx * angle - (text.length * angle) / 2
    // }deg)`;

    var transformReturn = `translate(200px,0px) rotate(30deg)`;

    return (returnedText += `<span id="${idx}">${char}</span>`);
  });
  // console.log(returnedText);
  var textCurved = text;

  return textCurved;
};

export const returnFlag = name => {
  if (name === "en") {
    return "flags/gb.png";
  } else if (name === "us") {
    return "flags/us.png";
  } else if (name === "de") {
    return "flags/de.png";
  } else if (name === "cn") {
    return "flags/cn.png";
  }
};

export const getPopulation = cities => {
  var totalPopulation = 0;
  cities.map(city => {
    totalPopulation =
      totalPopulation + parseInt(city.population.replace(/,/g, ""), 10);
  });
  return totalPopulation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getCityMeasurements = (width, height) => {
  var cityWidth = 0;
  var cityHeight = 0;
  var getCityWidth = Math.round((height - 100) * 0.714285143);
  if (getCityWidth > width * 0.9) {
    cityWidth = width * 0.9;
    cityHeight = width * 0.9 * 1.39875;
  } else {
    cityWidth = getCityWidth;
    cityHeight = getCityWidth * 1.39875;
  }

  return [cityWidth, cityHeight];
};

export const setNewBounds = (winWidth, winHeight) => {
  const lg = {
    imgWidth: 1200,
    imgHeight: 1679,
    imgMargin: 20,
  };
  const xl = {
    imgWidth: 1600,
    imgHeight: 2238,
    imgMargin: 40,
  };

  var newLgBounds = {
    left:
      winWidth > lg.imgWidth
        ? -((winWidth - lg.imgWidth) / 2 - lg.imgMargin)
        : -((lg.imgWidth - winWidth) / 2 + lg.imgMargin),

    right:
      winWidth > lg.imgWidth
        ? (winWidth - lg.imgWidth) / 2 - lg.imgMargin
        : (lg.imgWidth - winWidth) / 2 + lg.imgMargin,

    top:
      winHeight > lg.imgHeight
        ? -((winHeight - lg.imgHeight) / 2 - lg.imgMargin)
        : -((lg.imgHeight - winHeight) / 2 + lg.imgMargin),

    bottom:
      winHeight > lg.imgHeight
        ? (winHeight - lg.imgHeight) / 2 - lg.imgMargin
        : (lg.imgHeight - winHeight) / 2 + lg.imgMargin,
  };

  var newXlBounds = {
    left:
      winWidth > xl.imgWidth
        ? -((winWidth - xl.imgWidth) / 2 - xl.imgMargin)
        : -((xl.imgWidth - winWidth) / 2 + xl.imgMargin),

    right:
      winWidth > xl.imgWidth
        ? (winWidth - xl.imgWidth) / 2 - xl.imgMargin
        : (xl.imgWidth - winWidth) / 2 + xl.imgMargin,

    top:
      winHeight > xl.imgHeight
        ? -((winHeight - xl.imgHeight) / 2 - xl.imgMargin)
        : -((xl.imgHeight - winHeight) / 2 + xl.imgMargin),

    bottom:
      winHeight > xl.imgHeight
        ? (winHeight - xl.imgHeight) / 2 - xl.imgMargin
        : (xl.imgHeight - winHeight) / 2 + xl.imgMargin,
  };

  return [newLgBounds, newXlBounds];
};

export const updateControlledPosition = (
  controlledPosition,
  zoom,
  lgBounds
) => {
  var multiplier;
  if (zoom === "lg") {
    multiplier = 0.75;
  } else {
    multiplier = 1.33333;
  }

  var isLeft;

  if (controlledPosition.x > 0) {
    isLeft = true;
  } else {
    isLeft = false;
  }

  var isUp;

  if (controlledPosition.y < 0) {
    isUp = true;
  } else {
    isUp = false;
  }

  var newX = controlledPosition.x * multiplier;
  var newY = controlledPosition.y * multiplier;

  if (zoom === "lg") {
    if (newX < lgBounds.left || newX > lgBounds.right) {
      if (isLeft) {
        newX = lgBounds.right;
      } else {
        newX = lgBounds.left;
      }
    }
  }

  if (zoom === "lg") {
    if (newY < lgBounds.top || newY > lgBounds.bottom) {
      if (isUp) {
        newY = lgBounds.top;
      } else {
        newY = lgBounds.bottom;
      }
    }
  }

  return [newX, newY];
};

export const decideWallSize = (width, selection) => {
  if (width < 600) {
    switch (selection) {
      case 0:
        return [width, width * 0.8];
      case 1:
        return [width, width * 0.8];
      case 2:
        return [width, width * 0.7];
      default:
        return [width, width * 0.8];
    }
  }
};
