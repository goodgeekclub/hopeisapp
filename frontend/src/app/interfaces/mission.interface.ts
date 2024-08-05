export interface IProfileActivities {
  _id:       string;
  status:    string;
  coinValue: number;
  date:      Date;
  profile:   string;
  mission:   IMission;
  character: ICharacter;
  createdAt: Date;
  updatedAt: Date;
  __v:       number;
  photoUrl:  string;
}

export interface ICharacter {
  name:        string;
  title:       string;
  description: string;
  natures:     string[];
  quote:       string;
  ability:     string;
  detail:      string;
  photoUrl:    string;
}

export interface IMission {
  name:            string;
  description:     string;
  coinValue:       number;
  level:           number;
  photoUrl:        string;
  examplePhotoUrl: string;
  characterNames:  string[];
}