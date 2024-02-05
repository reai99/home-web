import { FC, useEffect, useMemo, useState } from "react";
import CardBox, { ItemProps, ItemEvent } from "@src/_components/CardBox";
import { useStore } from "@src/_utils/store";
import { Spin } from "antd";
import { useNavigate } from 'react-router-dom';
import { TargetTypeList } from "@src/_constants";

interface IProps {}

const Home: FC<IProps> = () => {

  const navigate = useNavigate();
  const { admin } = useStore('admin');
  const [loading, setLoading] = useState<boolean>(false);
  const [classList, setClassList] = useState<ItemProps[]>([]);


  const targetTypeMap = useMemo(() => TargetTypeList.reduce((r, c) => {
    r[c.code] = c.name;
    r[`${c.code}_color`] = c.color;
    return r;
  }, {}), []);

  const fetchClassify = async () => {
    try {
      setLoading(true);
      const res = await admin.getClassifyList();
      const _classList = (res || []).map(v => ({ 
        ...v,
        code: v.classCode,
        title: v.className,
        tagName: targetTypeMap[v.targetType],
        tagColor: targetTypeMap[`${v.targetType}_color`],
       }));
      setClassList(_classList);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const onEvent: ItemEvent = useMemo(() => {
    return {
      click: (record: ItemProps) => navigate(`/module?classCode=${record.classCode}`),
    }
  }, [navigate])

  useEffect(() => {
    fetchClassify();
  }, [])

  return (
    <Spin spinning={loading}>
      <CardBox items={classList} onEvent={onEvent}/>
    </Spin>
  )
}

export default Home;