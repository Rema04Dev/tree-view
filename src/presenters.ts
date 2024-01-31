export type IDoctypeDTO = {
  _id: string;
  key: string;
  abbr: string;
  name: string;
  subTypes?: ISubType[];
  status: 'published';
  _v: number;
};

export type ISubType = {
  key: string;
  abbr: string;
  name: string;
  subTypes?: ISubType[];
};

export type IDoctype = {
  id: string;
  key: string;
  abbr: string;
  name: string;
  subTypes: ISubType[];
};

export type INode = {
  name: string;
  children?: INode[];
};

export const convertToISubType = (subTypes?: ISubType[]): ISubType[] => {
  return subTypes ? subTypes.map((subtype) => ({
    key: subtype.key,
    abbr: subtype.abbr,
    name: subtype.name,
    subTypes: convertToISubType(subtype.subTypes),
  })) : [];
};

export const convertToIDoctype = (data: IDoctypeDTO[]): IDoctype[] => {
  return data.map((item) => {
    const doctype: IDoctype = {
      id: item._id,
      key: item.key,
      abbr: item.abbr,
      name: item.name,
      subTypes: convertToISubType(item.subTypes),
    };

    return doctype;
  });
};

export const convertDoctypeToNodes = (data: IDoctype[]): INode[] => {
  return data.map((item) => {
    const { subTypes, ...meta } = item
    const folderNode: INode = {
      name: item.name,
      metadata: meta,
      children: convertDoctypeToNodes(subTypes),
    };

    return folderNode;
  });
};
