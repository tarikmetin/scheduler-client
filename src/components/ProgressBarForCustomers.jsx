export default function ProgressBarForCustomers({
  circleCount = 3,
  clickCount,
  setClickCount,
  setShowModalForm,
  trigger,
  getValues,
}) {
  const circles = Array.from({ length: circleCount }, (_, index) => index + 1);

  async function handleClickNext() {
    const isValid = await trigger("patientName");

    if (!isValid) {
      return;
    }

    if (clickCount < circleCount) {
      setClickCount(clickCount + 1);
    }
  }

  function handleClickPrev() {
    if (clickCount > 1) {
      setClickCount(clickCount - 1);
    }
  }

  function handleClickCancel() {
    setShowModalForm(false);
  }

  return (
    <div className="container active">
      <div className="progress-container">
        <div
          id="progress"
          style={{ width: `${(clickCount - 1) * (100 / (circleCount - 1))}%` }}
        ></div>

        {circles?.map((circle) => {
          return (
            <div
              key={circle}
              className={`circle ${clickCount >= circle ? "active" : ""}`}
            >
              {circle}
            </div>
          );
        })}
      </div>

      <div className="button-holder">
        {clickCount === 1 && (
          <button id="prev" onClick={handleClickCancel} type="button">
            Cancel
          </button>
        )}
        {!(clickCount === 1) && (
          <button id="prev" onClick={handleClickPrev} type="button">
            Prev
          </button>
        )}

        {!(clickCount === circleCount) && (
          <button id="next" onClick={handleClickNext} type="button">
            Next
          </button>
        )}
        {clickCount === circleCount && (
          <button id="next" onClick={handleClickNext} type="submit">
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
