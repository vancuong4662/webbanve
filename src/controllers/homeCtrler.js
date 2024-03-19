const getHomepage = (req, res) => {
    res.render("test.ejs");
}
const getTest = (req, res) => {
    res.send("<h2>Đây là một nội dung test thử</h2>");
}

module.exports = {
    getHomepage,
    getTest
}