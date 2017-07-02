module.exports = {
    url: function() {
        return this.api.launchUrl + '/team';
    },
    elements: {
        teamMember: '.cz-diamond-grid__block:nth-of-type(15) .cz-diamond',
        teamMemberOverlay: '[cz-team-member].cz-split-panels--active',
        teamMemberOverlayTitle: '[cz-team-member].cz-split-panels--active h2',
        closeButton: '[cz-team-member].cz-split-panels--active .cz-split-panels__close'
    }
};
