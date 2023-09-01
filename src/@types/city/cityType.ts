export type CityDataAll = {
  response: {
    service: {
      name: 'data';
      version: '2.0';
      operation: 'getfeature';
      time: '535(ms)';
    };
    status: 'OK';
    record: {
      total: '17';
      current: '17';
    };
    page: {
      total: '1';
      current: '1';
      size: '1000';
    };
    result: {
      featureCollection: {
        type: 'FeatureCollection';
        bbox: [0, 0, -1, -1];
        features: Features[];
      };
    };
  };
};

export type Features = {
  type: string;
  properties: Properties;
  id: string;
};

export type Properties = {
  ctp_eng_nm: string;
  ctprvn_cd: string;
  ctp_kor_nm: string;
};
