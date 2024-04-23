import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const AdvancedFilter = () => {
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log('Received values of form:', values);
  };

  const handleReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <h3>Advanced Filter</h3>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="type" label="Type">
          <Select>
            <Option value="">Local</Option>
            <Option value="">Club</Option>
            <Option value="">Multi-National</Option>
            <Option value="">Departmental</Option>
            <Option value="">School</Option>
            <Option value="">College</Option>
            <Option value="">University</Option>
            <Option value="">Office</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={handleReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdvancedFilter;
