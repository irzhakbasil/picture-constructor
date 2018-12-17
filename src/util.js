let a = [];
for (let i = 1; i <= 15; i++) {
  let tmp = "0";
  if (i < 10) {
    a.push({
      id: i,
      border: "rama-" + (tmp + i.toString()) + ".png",
      preview: "prev." + (tmp + i.toString()) + ".jpg"
    });
  } else
    a.push({
      id: i,
      border: "rama-" + i + ".png",
      preview: "prev." + i + ".png"
    });
}
console.log(JSON.stringify(a));

const imageBaseURL = "./assets/img/borders/";

export default imageBaseURL;
