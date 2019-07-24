const endPoint = `https://dashboards.anarockdigital.com/external/v0/test`;
const key = `key=ncebubcegh`;

export const fetchData = async sql => {
  try {
    const response = await fetch(`${endPoint}?sql=${sql}&${key}`).then(
      response => {
        return response.json();
      }
    );
    return response.data;
  } catch (e) {
    return e;
  }
};
