if vim.g.loaded_marco_nvim then
  return
end
vim.g.loaded_myplugin = true

vim.api.nvim_create_user_command("MarcoCompile", function()
  require("marco").compile()
end, {})
