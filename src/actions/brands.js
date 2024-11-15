const supabase = require('../config/bd');

const getAllBrands = async () => {
    const { data, error } = await supabase
    .from('models_view')
    .select('*');
  if (error) {
    return {
      message: "error al consultar los registros",
      code: 500,
      error: error,
    };
  }
  return data;
}
const getAllByBrand = async (brand) => {
    const { data, error } = await supabase
    .from('models')
    .select('id, name, average_price')
    .eq('brand', brand);
  if (error) {
    return {
        message: "error al consultar datos",
        code: 500,
        error: error,
    };
  }
  return data;
}
const createBrand = async (name) => {
  const { data } = await supabase
  .from('brands')
  .select('*')
  .eq('name', name);
  if(data.length){
    return {
      code: 409,
      error: 'Conflict',
      message: 'Registro duplicado',
    }
  }
  const { error } = await supabase
  .from('brands')
  .insert({ name });
  if(error){
    return {
      code: 500,
      error: error,
      message: 'Error interno al guardar la información.',
    }
  }
  return { name };
}
const createModel = async (data) => {
  const { data: dataBrand} = await supabase
  .from('brands')
  .select('*')
  .eq('id', data.idBrand);
  if(!dataBrand.length) {
    return {
      code: 404,
      error: 'Not found',
      message: 'idBrand no existente,',
    }
  }
  const { data: dataModel } = await supabase
  .from('models')
  .select('*')
  .eq('name', data.name);
  if(dataModel.length) {
    return {
      code: 409,
      error: 'Conflict',
      message: 'Registro duplicado',
    }
  }
  let newModel = {
    name: data.name,
    brand: data.idBrand,
  }
  if(data.average_price && data.average_price > 100000) {
    newModel.average_price = data.average_price;
  }
  const { error } = await supabase
  .from('models')
  .insert(newModel);
  if(error){
    return {
      code: 500,
      error: error,
      message: 'Error interno al guardar la información.',
    }
  }
  return newModel;
}
const updateModel = async({ average_price }, idModel) => {
  if(average_price <= 100000) {
    return {
      code: 400,
      error: 'Invalid data',
      message: 'average_price debe ser mayor a 100000',
    }
  }
  const { error } = await supabase
  .from('models')
  .update({ average_price })
  .eq('id', idModel);
  if(error){
    return {
      code: 500,
      error: error,
      message: 'Error interno al guardar la información.',
    }
  }
  return { average_price };
}
const getModels = async(greater, lower) => {
  let result;
  if(!greater && !lower){
    result = await supabase.from('models').select('id, name, average_price');
  }
  if(greater && !lower){
    result = await supabase.from('models').select('id, name, average_price')
    .gte('average_price', greater);
  }
  if(!greater && lower){
    result = await supabase.from('models').select('id, name, average_price')
    .lte('average_price', lower);
  }
  if(greater && lower){
    result = await supabase.from('models').select('id, name, average_price')
    .gte('average_price', greater)
    .lte('average_price', lower);
  }
  if(result.error){
    return {
      message: "error al consultar los registros",
      code: 500,
      error: error,
    };
  }
  return result.data
}

module.exports = {
    getAllBrands,
    getAllByBrand,
    createBrand,
    createModel,
    updateModel,
    getModels,
};
