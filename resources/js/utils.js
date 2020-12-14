export const goBack = history => {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('r') ?? 1;
    console.log("m", myParam);
    history.push(`/page/${myParam}`);
}
