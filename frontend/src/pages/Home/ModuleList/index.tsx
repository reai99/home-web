import { FC, useEffect, useMemo, useState } from "react";
import CardBox, { ItemProps } from "@src/_components/CardBox";
import { useStore } from "@src/_utils/store";
import { Spin } from "antd";
import qs from 'query-string';

import { useLocation } from "react-router-dom";

interface IProps {}

const ModuleList: FC<IProps> = () => {

  const { search } = useLocation();

  const { admin } = useStore('admin');
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<ItemProps[]>([]);

  const searchParams = useMemo(() => qs.parse(search), [search]);

  const fetchClassify = async () => {
    try {
      if (!searchParams.classCode) return;
      setLoading(true);
      const res = await admin.getModulesList({ data: { code: searchParams.classCode }});
      const _list = (res || []).map((v) => ({
        ...v,
        code: v.moduleCode,
        title: v.moduleName,
        tagName: v.className,
        tagColor: '#52c41a',
      }));
      setList(_list);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClassify();
  }, [])

  return (
    <Spin spinning={loading}>
      <CardBox items={list} />
    </Spin>
  )
}

export default ModuleList;