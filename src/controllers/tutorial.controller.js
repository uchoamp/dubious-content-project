const tutorialCtrl = {};

tutorialCtrl.showTutorial = (req, res) => {
    const tutor = req.params.tutor

    const tutorials = {
        textractor: {
            meta_description: "Guia simples de como traduzir Visual Novel utilizando TEXTRACTOR",
            meta_keywords: " como, textractor, traduzir visual novel, utilizar, traduzir hentai game, como traduzir hentai game", canonical: "tutorial/textractor",
            tittle: "COMO TRADUZIR VISUAL NOVEL COM TEXTRACTOR"
        }
    };


    res.render("tutorials/" + tutor, tutorials[tutor]);
}



module.exports = tutorialCtrl;