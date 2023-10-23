let createRow = (container, studentName, samples) => {
  const row = document.createElement("div");
  row.classList.add("row");
  container.appendChild(row);

  const rowLabel = document.createElement("div");
  rowLabel.innerHTML = studentName;
  rowLabel.classList.add("rowLabel");
  row.appendChild(rowLabel);

  for (let sample of samples) {
    const { id, label, student_id } = sample;

    const sampleContainer = document.createElement("div");
    sampleContainer.id = `sample_${id}`;
    sampleContainer.onclick = () => handleClick(sample, false);
    sampleContainer.classList.add("sampleContainer");

    const sampleLabel = document.createElement("div");
    sampleLabel.innerHTML = label;
    sampleContainer.appendChild(sampleLabel);

    const img = document.createElement("img");
    img.src = `${constants.IMG_DIR}/${id}.png`;
    img.classList.add("thumb");

    if (utils.flaggedUsers.includes(student_id)) {
      img.classList.add("blur");
    }

    sampleContainer.appendChild(img);
    row.appendChild(sampleContainer);
  }
};

let handleClick = (sample, doScroll = true) => {
  if (sample === null) {
    [...document.querySelectorAll(".emphasize")].forEach((each) =>
      each.classList.remove("emphasize")
    );
    return;
  }

  // [...document.querySelectorAll(".emphasize")].forEach((each) =>
  //   each.classList.remove("emphasize")
  // );
  const el = document.querySelector(`#sample_${sample.id}`);
  console.log(el);

  if (el.classList.contains("emphasize")) {
    el.classList.remove("emphasize");
    chart.selectSample(null);
    return;
  }
  [...document.querySelectorAll(".emphasize")].forEach((each) =>
    each.classList.remove("emphasize")
  );
  el.classList.add("emphasize");

  if (doScroll) {
    el.scrollIntoView({
      behavior: "auto",
      block: "center",
    });
  }

  chart.selectSample(sample);
};

let toggleInput = () => {
  if (document.querySelector("#inputContainer").style.display === "none") {
    document.querySelector("#inputContainer").style.display = "block";
    sketchPad.triggerUpdate();
  } else {
    document.querySelector("#inputContainer").style.display = "none";
    chart.hideDynamicPoint();
  }
};
