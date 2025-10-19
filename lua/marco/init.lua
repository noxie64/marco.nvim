local M = {}

function M.compile()
    local current_file = vim.fn.expand("%:p")
    local output = vim.fn.system({ "npx", "ts-node", "./lib/src/main.ts", current_file })
    vim.notify(output)
end

function M.install()
    vim.notify("Test")
    local output = vim.fn.system({ "npm", "i"})
    vim.notify(output)
end

return M
