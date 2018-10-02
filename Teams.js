module.exports = {
  Amiens: { id: 0, toString: function () { return ('Amiens'); }, lequipeId: 44, standingName: 'AmiensSC' },
  Angers: { id: 1, toString: function () { return ('Angers'); }, lequipeId: 374, standingName: 'AngersSCO' },
  Bordeaux: { id: 2, toString: function () { return ('Bordeaux'); }, lequipeId: 18, standingName: 'GirondinsdeBordeaux' },
  Caen: { id: 3, toString: function () { return ('Caen'); }, lequipeId: 41, standingName: 'SMCaen' },
  Dijon: { id: 4, toString: function () { return ('Dijon'); }, lequipeId: 202, standingName: 'DijonFCO' },
  Guingamp: { id: 5, toString: function () { return ('Guingamp'); }, lequipeId: 37, standingName: 'EAGuingamp' },
  Lille: { id: 6, toString: function () { return ('Lille'); }, lequipeId: 43, standingName: 'LOSC' },
  Lyon: { id: 7, toString: function () { return ('Lyon'); }, lequipeId: 22, standingName: 'OlympiqueLyonnais' },
  Marseille: { id: 8, toString: function () { return ('Marseille'); }, lequipeId: 6, standingName: 'OlympiquedeMarseille' },
  Monaco: { id: 9, toString: function () { return ('Monaco'); }, lequipeId: 25, standingName: 'ASMonaco' },
  Montpellier: { id: 10, toString: function () { return ('Montpellier'); }, lequipeId: 17, standingName: 'MontpellierHéraultSC' },
  Nantes: { id: 11, toString: function () { return ('Nantes'); }, lequipeId: 15, standingName: 'FCNantes' },
  Nice: { id: 12, toString: function () { return ('Nice'); }, lequipeId: 46, standingName: 'OGCNice' },
  Nimes: { id: 13, toString: function () { return ('Nimes'); }, lequipeId: 47, standingName: '' },
  Paris: { id: 14, toString: function () { return ('Paris SG'); }, lequipeId: 26, standingName: 'ParisSaint-Germain' },
  Reims: { id: 15, toString: function () { return ('Reims'); }, lequipeId: 211, standingName: '' },
  Rennes: { id: 16, toString: function () { return ('Rennes'); }, lequipeId: 14, standingName: 'StadeRennaisFC' },
  StEtienne: { id: 17, toString: function () { return ('St Etienne'); }, lequipeId: 38, standingName: 'ASSaint-Etienne' },
  Strasbourg: { id: 18, toString: function () { return ('Strasbourg'); }, lequipeId: 13, standingName: 'RCStrasbourgAlsace' },
  Toulouse: { id: 19, toString: function () { return ('Toulouse'); }, lequipeId: 12, standingName: 'ToulouseFC' },
  getTeam: function (name) {
    for (var key in module.exports) {
      if (module.exports[key].toString() === name){
        return module.exports[key];
      }
    }
    return null;
  }
};
