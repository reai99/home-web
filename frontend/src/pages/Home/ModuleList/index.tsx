import { FC, useEffect, useMemo, useState } from "react";
import CardBox from "@src/_components/CardBox";
import { useStore } from "@src/_utils/store";
import { Button, Spin } from "antd";
import qs from 'query-string';

import { useLocation } from "react-router-dom";

interface IProps {}

const ModuleList: FC<IProps> = () => {

  const { search } = useLocation();

  const { admin } = useStore('admin');
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<Record<string, unknown>[]>([]);

  const searchParams = useMemo(() => qs.parse(search), [search]);

  const fetchClassify = async () => {
    try {
      if (!searchParams.classCode) return;
      setLoading(true);
      const res = await admin.getModulesList({ data: { code: searchParams.classCode }});
      const _list = (res || []).map(v => ({
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
      <div className="fr margin-top-16 margin-right-16">
        <Button onClick={() => window.history.go(-1)} size="small" type="primary" style={{ background: '#1ad087'}}>返回上一级</Button>
      </div>
      <CardBox items={list} />
    </Spin>
  )
}

export default ModuleList;